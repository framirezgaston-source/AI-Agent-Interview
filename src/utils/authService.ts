import { UserRole, UserSession } from '../types';

export interface StoredUser {
  id: string;
  nombre: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: UserRole;
  tenantName: string;
  createdAt: string;
}

const STORAGE_KEY = 'syntropic_registered_users_v1';
const SESSION_KEY = 'syntropic_active_session_v1';

// Función para generar SHA-256 en el navegador con Web Crypto API
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Inicializar la base de datos de usuarios si no existe
export async function initializeUsersDB(): Promise<void> {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const saltElena = generateSalt();
    const hashElena = await sha256('demo123' + saltElena);

    const defaultUsers: StoredUser[] = [
      {
        id: 'usr-001',
        nombre: 'Elena Rostova',
        email: 'elena.rostova@techcorp.io',
        passwordHash: hashElena,
        salt: saltElena,
        role: 'Talent Lead',
        tenantName: 'TechCorp Inc.',
        createdAt: new Date().toISOString()
      }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
  }
}

export function getStoredUsers(): StoredUser[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function registerNewUser(
  nombre: string,
  email: string,
  password: string,
  role: UserRole = 'Talent Lead',
  tenantName: string = 'TechCorp Inc.'
): Promise<{ success: boolean; message: string; user?: StoredUser }> {
  await initializeUsersDB();
  const emailClean = email.trim().toLowerCase();

  if (!emailClean || !emailClean.includes('@')) {
    return { success: false, message: 'Por favor ingresa un correo electrónico válido.' };
  }
  if (password.length < 6) {
    return { success: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }

  const users = getStoredUsers();
  const exists = users.find(u => u.email.toLowerCase() === emailClean);
  if (exists) {
    return { success: false, message: `El correo '${emailClean}' ya está registrado. Por favor inicia sesión.` };
  }

  const salt = generateSalt();
  const passwordHash = await sha256(password + salt);

  const newUser: StoredUser = {
    id: `usr-${Date.now()}`,
    nombre: nombre.trim() || emailClean.split('@')[0],
    email: emailClean,
    passwordHash,
    salt,
    role,
    tenantName: tenantName.trim() || 'TechCorp Inc.',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return {
    success: true,
    message: `¡Cuenta creada con éxito para ${emailClean}! Ya puedes iniciar sesión.`,
    user: newUser
  };
}

export async function verifyUserCredentials(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: StoredUser }> {
  await initializeUsersDB();
  const emailClean = email.trim().toLowerCase();
  const users = getStoredUsers();

  const user = users.find(u => u.email.toLowerCase() === emailClean);
  if (!user) {
    return {
      success: false,
      message: 'No existe ninguna cuenta registrada con este correo. Regístrate en la pestaña "Crear Cuenta Real".'
    };
  }

  const enteredHash = await sha256(password + user.salt);
  if (enteredHash !== user.passwordHash) {
    return {
      success: false,
      message: 'Contraseña incorrecta. Por favor verifica tus credenciales.'
    };
  }

  return {
    success: true,
    message: `Bienvenido de nuevo, ${user.nombre}`,
    user
  };
}

export function convertStoredUserToSession(stored: StoredUser): UserSession {
  return {
    email: stored.email,
    nombre: stored.nombre,
    cargo: stored.role === 'Talent Lead' ? 'Talent AI Lead' : stored.role,
    role: stored.role,
    tenant: {
      id: 't-001',
      name: stored.tenantName,
      tier: 'Enterprise Elite'
    },
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC1On3aDwams0rnMYwVmJbBf4X8--1uuY7mBHIZ1rWirFQoR2_x44CRT1vJIcXXzaYkVyBduAabgwqOKn7J-7yZkw3hGUa4K3yWLONgOptXTdLITkMwwjO65rV75opTngyZtMTyWS9PD77Yc1mKpSnNKbp4EPMepCiDzXC3aoTlZ3Lo94Zq2E4RXaY7REOMTRlUyhJnAZ9ERiCzhUdnx1ho1zwAAuA2jbRcJGdRfn89ymuDMrNTjGf'
  };
}

export function saveActiveSession(session: UserSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error(e);
  }
}

export function getActiveSession(): UserSession | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearActiveSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error(e);
  }
}

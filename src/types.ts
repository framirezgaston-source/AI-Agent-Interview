export type UserRole = 
  | 'SuperAdmin' 
  | 'Talent Lead' 
  | 'Recruiter' 
  | 'Hiring Manager' 
  | 'Technical Interviewer' 
  | 'Candidato';

export interface UserSession {
  email: string;
  nombre: string;
  cargo: string;
  role: UserRole;
  avatar: string;
  tenant: {
    id: string;
    name: string;
    tier: string;
  };
}

export interface Candidate {
  id: string;
  slug: string;
  nombre: string;
  email: string;
  telefono: string;
  posicion_id: string;
  posicion_titulo: string;
  tags: string[];
  avatar: string;
  fecha_entrevista: string;
  hora: string;
  duracion: string;
  score: number;
  tier: string;
  estado: 'Recomendado' | 'En Revisión' | 'No Cumple' | 'Aprobado Fase Final';
  breakdown: {
    tech: number;
    culture: number;
    arch: number;
    comm: number;
  };
  cv_file: string;
  skills: string[];
  resumen_ia: string;
  radar: {
    Algoritmos: number;
    MLOps: number;
    Liderazgo: number;
    Cultura: number;
    Resolución: number;
  };
  transcript_highlight?: {
    time: string;
    agent: string;
    candidate: string;
  };
}

export interface TokenLink {
  id: string;
  candidato: string;
  email: string;
  posicion_code: string;
  token: string;
  url: string;
  expira_en: string;
  estado: 'No utilizado' | 'En progreso' | 'Completado';
  creado: string;
}

export interface KnowledgeFile {
  name: string;
  size: string;
  type: 'PDF' | 'DOC' | 'TXT';
  status: string;
}

export interface RubricCriteria {
  id: number;
  criterio: string;
  peso: number;
  descripcion: string;
}

export interface InterviewSession {
  posicion_titulo: string;
  candidata_nombre: string;
  tiempo_transcurrido: string;
  tiempo_total: string;
  paso: string;
  fase: string;
  pregunta_actual: {
    numero: number;
    total: number;
    id: string;
    contexto: string;
    texto: string;
    fuente: string;
    tiempo_sugerido: string;
  };
  transcripcion: {
    emisor: string;
    hora: string;
    texto: string;
    is_agent: boolean;
    is_current?: boolean;
  }[];
  evaluacion_tiempo_real: {
    criterio: string;
    detalle: string;
    score: number;
    feedback: string;
  }[];
  observaciones_ia: string;
}

export type ActiveTab = 
  | 'dashboard' 
  | 'posiciones' 
  | 'candidatos' 
  | 'entrevistas' 
  | 'links' 
  | 'buscar' 
  | 'portal_candidato'
  | 'codigo_streamlit';

export type ViewMode = 'syntropic' | 'streamlit';

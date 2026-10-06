"""
Syntropic AI - Cliente de API para FastAPI
Encapsula todas las llamadas HTTP al backend FastAPI con inyección de JWT,
manejo de errores y fallback transparente a mocks locales cuando la API está offline.
"""

import os
import requests
import streamlit as st
from typing import Dict, Any, List, Optional
from mocks import mock_data

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000/api/v1")
TIMEOUT_SECONDS = int(os.getenv("API_TIMEOUT", "4"))


class APIClient:
    """Cliente unificado para interactuar con los microservicios de Syntropic AI FastAPI."""
    
    def __init__(self, base_url: str = API_BASE_URL):
        self.base_url = base_url.rstrip("/")
        
    def _get_headers(self) -> Dict[str, str]:
        """Inyecta el token Bearer JWT y el Tenant ID desde la sesión actual."""
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        if "jwt_token" in st.session_state and st.session_state.jwt_token:
            headers["Authorization"] = f"Bearer {st.session_state.jwt_token}"
        if "tenant" in st.session_state and st.session_state.tenant:
            headers["X-Tenant-ID"] = st.session_state.tenant.get("id", "t-001")
        return headers

    def get_kpis(self) -> Dict[str, Any]:
        """Obtiene las métricas operativas del reclutador (KPIs)."""
        try:
            resp = requests.get(f"{self.base_url}/stats/kpis", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return mock_data.MOCK_KPIS

    def get_positions(self) -> List[Dict[str, Any]]:
        """Obtiene el catálogo de vacantes y pipelines de entrevista activos."""
        try:
            resp = requests.get(f"{self.base_url}/positions", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return mock_data.MOCK_POSICIONES

    def create_position(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Crea una nueva posición de entrevista con base de conocimiento y ponderaciones."""
        try:
            resp = requests.post(f"{self.base_url}/positions", json=payload, headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code in [200, 201]:
                return resp.json()
        except Exception:
            pass
        # Fallback local para demo
        new_pos = {
            "id": f"pos-{len(mock_data.MOCK_POSICIONES) + 1:03d}",
            "code": f"SYN-{9000 + len(mock_data.MOCK_POSICIONES)}",
            "titulo": payload.get("titulo", "Nueva Posición"),
            "stack": payload.get("stack", "Full Stack"),
            "departamento": payload.get("departamento", "Engineering"),
            "seniority": payload.get("seniority", "Senior"),
            "modalidad": payload.get("modalidad", "Full-time / Remoto"),
            "estado": "Activa",
            "postulantes_count": 0,
            "evaluados_count": 0,
            "knowledge_files": payload.get("knowledge_files", []),
            "ai_directive": payload.get("ai_directive", ""),
            "rubricas": payload.get("rubricas", [])
        }
        mock_data.MOCK_POSICIONES.append(new_pos)
        return new_pos

    def get_candidates(self, position_id: Optional[str] = None, min_score: Optional[int] = None, status: Optional[str] = None) -> List[Dict[str, Any]]:
        """Obtiene la lista de candidatos evaluados con filtros de posición, score y estado."""
        try:
            params = {}
            if position_id and position_id != "all":
                params["position_id"] = position_id
            if min_score:
                params["min_score"] = min_score
            if status and status != "all":
                params["status"] = status
                
            resp = requests.get(f"{self.base_url}/candidates", params=params, headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
            
        candidates = list(mock_data.MOCK_CANDIDATOS)
        if min_score:
            candidates = [c for c in candidates if c["score"] >= min_score]
        if status and status != "all":
            candidates = [c for c in candidates if c["estado"].lower() == status.lower()]
        return candidates

    def get_candidate_detail(self, candidate_slug: str) -> Optional[Dict[str, Any]]:
        """Obtiene el detalle completo y radar de competencias de un candidato específico."""
        try:
            resp = requests.get(f"{self.base_url}/candidates/{candidate_slug}", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        for c in mock_data.MOCK_CANDIDATOS:
            if c["slug"] == candidate_slug or c["id"] == candidate_slug:
                return c
        return mock_data.MOCK_CANDIDATOS[2]  # Default Elena Rostova

    def approve_candidate(self, candidate_id: str) -> bool:
        """Aprueba al candidato a la Fase Final (Hiring Manager)."""
        try:
            resp = requests.post(f"{self.base_url}/candidates/{candidate_id}/approve", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return True
        except Exception:
            pass
        for c in mock_data.MOCK_CANDIDATOS:
            if c["id"] == candidate_id:
                c["estado"] = "Aprobado Fase Final"
                c["estado_color"] = "emerald"
                return True
        return True

    def get_interview_session(self, session_id: str = "default") -> Dict[str, Any]:
        """Obtiene la telemetría, transcripción en vivo y evaluación IA de una sesión de entrevista."""
        try:
            resp = requests.get(f"{self.base_url}/interviews/{session_id}", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return mock_data.MOCK_INTERVIEW_SESSION

    def get_links(self) -> List[Dict[str, Any]]:
        """Obtiene el listado de enlaces dinámicos de un solo uso generados."""
        try:
            resp = requests.get(f"{self.base_url}/links", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return mock_data.MOCK_LINKS

    def generate_token_link(self, candidate_name: str, email: str, position_code: str) -> Dict[str, Any]:
        """Genera un nuevo enlace dinámico con token HMAC de un solo uso."""
        try:
            payload = {"candidato": candidate_name, "email": email, "position_code": position_code}
            resp = requests.post(f"{self.base_url}/links/generate", json=payload, headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        import uuid
        token_id = f"tok_{uuid.uuid4().hex[:8]}"
        new_link = {
            "id": f"tok-{len(mock_data.MOCK_LINKS) + 1:03d}",
            "candidato": candidate_name,
            "email": email,
            "posicion_code": position_code,
            "token": token_id,
            "url": f"http://localhost:8501/Portal_Candidato?token={token_id}&pos={position_code}",
            "expira_en": "48h 00m",
            "estado": "No utilizado",
            "estado_badge": "bg-blue-50 text-blue-700",
            "creado": "Recién generado"
        }
        mock_data.MOCK_LINKS.insert(0, new_link)
        return new_link

    def send_mass_invitations(self) -> int:
        """Simula el envío masivo de correos con enlaces únicos de invitación."""
        try:
            resp = requests.post(f"{self.base_url}/links/dispatch-mass", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json().get("dispatched_count", 15)
        except Exception:
            pass
        return 15


# Instancia singleton del cliente para uso en las vistas
api = APIClient()

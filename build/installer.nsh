; Real DND DM Helper - custom NSIS.
; Disable CRC integrity check so the installer does not show "setup files are corrupt"
; when the file is blocked by Windows, copied to USB, or modified by antivirus.
!macro customHeader
  CRCCheck off
!macroend

!macro customInstall
  ; No sub-installer (Ollama is optional; user can install from app Options -> AI).
!macroend

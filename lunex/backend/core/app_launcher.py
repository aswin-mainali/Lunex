from __future__ import annotations
import platform, subprocess, webbrowser

def open_app(target: str) -> dict[str, str]:
    if not target.strip(): return {"status": "error", "message": "No app target provided."}
    if platform.system() == "Windows": subprocess.Popen(["cmd", "/c", "start", "", target], shell=False)
    else: subprocess.Popen([target])
    return {"status": "ok", "message": f"Requested app launch: {target}"}

def open_website(url: str) -> dict[str, str]:
    if not url.startswith(("http://", "https://")): url = f"https://{url}"
    webbrowser.open(url)
    return {"status": "ok", "message": f"Opening website: {url}"}

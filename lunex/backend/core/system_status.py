from __future__ import annotations
import os, platform, shutil

def get_system_status() -> dict[str, str]:
    total, used, _ = shutil.disk_usage(PathRoot())
    return {"os": f"{platform.system()} {platform.release()}", "cpu": f"{os.cpu_count() or 'unknown'} logical CPUs", "ram": "RAM usage placeholder", "disk": f"{round((used / total) * 100, 1)}% used", "network": "Network status placeholder"}

def PathRoot() -> str:
    return os.getenv("SystemDrive", "/") + ("\\" if platform.system() == "Windows" else "")

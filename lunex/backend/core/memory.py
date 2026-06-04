from __future__ import annotations
import sqlite3

def remember(conn: sqlite3.Connection, key: str, value: str, category: str = "general") -> None:
    conn.execute("INSERT INTO memories(key, value, category) VALUES (?, ?, ?)", (key, value, category))
    conn.commit()

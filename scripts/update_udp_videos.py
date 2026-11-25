#!/usr/bin/env python3
"""Genera udp-videos.json con los vídeos del canal Un Dato Pixelado y sus
visualizaciones. Sin claves: feed público del canal (lista de vídeos) y el
HTML público de cada vídeo (viewCount). Si algo falla, sale con error y no
toca el JSON anterior: la web se queda con el último dato bueno."""
import json, re, sys, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone

CHANNEL_ID = "UCHnzgxhGpffE2asgX_tNLlA"
FEED = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"}
NS = {"atom": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}

def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()

feed = ET.fromstring(get(FEED))
entries = feed.findall("atom:entry", NS)
if not entries:
    sys.exit("feed sin vídeos; no se actualiza")

videos = []
for e in entries:
    vid = e.find("yt:videoId", NS).text
    title = e.find("atom:title", NS).text
    published = e.find("atom:published", NS).text
    html = get(f"https://www.youtube.com/watch?v={vid}").decode("utf-8", "replace")
    m = re.search(r'"viewCount":"(\d+)"', html)
    if not m:
        sys.exit(f"sin viewCount para {vid}; no se actualiza")
    videos.append({
        "id": vid,
        "title": title,
        "views": int(m.group(1)),
        "published": published,
        "url": f"https://www.youtube.com/shorts/{vid}",
        "thumb": f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg",
    })

videos.sort(key=lambda v: v["views"], reverse=True)
out = {
    "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    "channel": "https://www.youtube.com/@undatopixelado",
    "videos": videos,
}
with open("udp-videos.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print(f"ok: {len(videos)} vídeos")

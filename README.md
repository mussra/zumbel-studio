# Zumbel Studio

Web oficial estática del estudio. HTML y CSS sin proceso de compilación, sin dependencias de ejecución ni analítica. Publicación en GitHub Pages desde main / (root).

## Ejecutar localmente

`python3 -m http.server 8000`

## Contenido

- index.html: estudio, proyectos, Rancho y contacto.
- privacidad.html: privacidad de la web y política de Rancho.
- assets/: logo original de Zumbel, ilustración original del juego, favicon derivado del logo y fuentes locales.

## Arquitectura y relación con la web de Vane

Se mantiene la base estática HTML/CSS y GitHub Pages, con fuentes y ficheros locales. El proyecto Vane usa Firebase/Firestore para sincronización y Cloudflare R2 para vídeos. Esta web no requiere sesiones sincronizadas ni vídeos, por lo que NO se conecta a esos servicios ni a sus datos. No se han copiado claves, configuraciones, fotografías ni contenidos familiares. No se ha modificado el repositorio Vane-Cumple-40.

Si se añade un catálogo editable o vídeos en el futuro, deberán utilizar un proyecto Firebase y un almacenamiento R2 propios, con reglas y costes revisados. No cargar credenciales en el cliente ni activar seguimiento por defecto.

## Estado de publicación de juegos

Los proyectos se presentan en desarrollo. No hay botones de descarga ni enlaces a Google Play hasta contar con una publicación validada. La marca se usa según la identidad gráfica facilitada, sin afirmar registro legal de marca.

## Derechos

El arte de marca y de Rancho pertenece a su proyecto de origen; no se otorga licencia de reutilización por publicar este repositorio. Montserrat y Lora se distribuyen bajo SIL Open Font License; ver assets/OFL-*.txt.

## Capturas

Galería con capturas reales de material de desarrollo del repositorio GORodeoGO: Frontera (camara-cinematica-186) y Rodeo (isolated-trial). Identificadas como versiones de desarrollo, no como aspecto final. La primera versión no incluye vídeos, según la instrucción del usuario. Imágenes servidas desde Pages; futura migración a R2 pendiente de acceso y decisión del propietario.

# tienda-demo

Notas de desarrollo para esta demo.

## Objetivo
Mantener una tienda frontend clara, reutilizable y fácil de mostrar en un portfolio. La identidad de Bazario es ficticia y el catálogo es de demostración.

## Principios de trabajo
- Mantener la demo independiente y fácil de ejecutar sin build.
- Priorizar una interfaz clara, responsive y usable con teclado.
- Tratar las entradas del usuario como datos, no como HTML confiable.
- No presentar las simulaciones como integraciones reales.
- Evitar dependencias innecesarias.
- Probar los recorridos principales antes de cerrar un cambio.

## Estructura
- HTML en la raíz y en admin/.
- Estilos en assets/css/.
- Lógica en assets/js/.
- Validación general en scripts/validate.mjs.
- Pruebas de navegador en tests/e2e/.

## Límites de la demo
No hay backend, base de datos, autenticación real, pagos reales, correo real ni almacenamiento de archivos en servidor. El estado de la demo se guarda en el navegador.

## Antes de cerrar un cambio
Ejecutar:
~~~bash
node scripts/validate.mjs
npm install
npm run test:e2e
~~~

En cambios visuales, revisar escritorio y móvil.
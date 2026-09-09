# Cómo trabajar con Diego en tienda-demo (venta de páginas web)

Este repo es el **demo genérico** que Diego usa para vender páginas web a
emprendimientos como servicio aparte de Glenox, pago único de armado +
hosting mensual. Marca ficticia "Bazario" adentro, sin tocar nada de
ningún negocio real hasta que haya compromiso.

**Demo en vivo**: https://diego-20000.github.io/tienda-demo/

## Reglas fijas

1. **Nunca mostrar nada de IA en el producto/README que ve un prospecto.**
   El historial de commits sí lleva firma de Claude (obligatorio del lado
   mío, no negociable) pero eso no es visible para nadie que solo mire la
   web o el README, Diego prefiere que así se mantenga.
2. **Demo genérico primero, seña antes de armar a medida.** Nunca repetir
   el error de la página de Priscila (armar todo a medida antes de que
   haya compromiso real, terminó sin usarse). Mostrar este demo genérico,
   y solo cuando el prospecto confirma interés real, pedir seña antes de
   personalizar con su marca/catálogo.
3. **Siempre aclarar que el diseño es 100% personalizable** (colores,
   productos, todo) en cualquier mensaje de outreach, decisión explícita
   de Diego, 08/09/2026.
4. **Cobro**: pago único de armado + hosting mensual recurrente (no
   créditos, no packs, ver el mismo criterio de pricing que Glenox en
   `glenox/config.py`, pero para este producto es simple: seña + saldo al
   entregar, después mensual de hosting).
5. **Cómo entregar los mensajes sugeridos a Diego (regla importante,
   08/09/2026)**: nunca con estructura de markdown vistosa, nada de `---`
   como separador, nada de encabezados en negrita por contacto, nada de
   listas con viñetas para presentar mensajes de WhatsApp. Diego lo
   describió así: "tiene que ser que hable con una persona no con una
   IA". Escribir los mensajes sugeridos como texto corrido, uno atrás del
   otro si son varios, como si se los estuviera dictando un amigo, no
   como una entrega de documento. Esto aplica siempre que se le sugiera
   qué contestarle a alguien, no solo la primera vez.
6. **Tono de los mensajes, no solo la estructura (08/09/2026)**: hablar
   fluido, sin trabarse ni sonar acartonado, frases cortas y naturales,
   como hablaría Diego de verdad, no una redacción prolija. Y nada de
   insistir ni presionar para que contesten, Diego lo dijo explícito:
   "no me gusta insistir". Ofrecer, decir lo justo, y dejar que la otra
   persona decida sin empujarla.
7. **Nunca usar la raya "—" (em dash), en nada (08/09/2026).** Ni en
   mensajes sugeridos, ni en este archivo, ni en ningún doc. Diego lo
   pidió explícito: "esto no me gusta, sacalo ya de todo". Usar punto,
   coma o simplemente cortar la oración en dos.
8. **No repetir tal cual frases ya usadas antes.** Cada mensaje nuevo
   (a un contacto distinto, o un mensaje de seguimiento) tiene que sonar
   distinto a los anteriores, no reciclar la misma oración palabra por
   palabra solo cambiando el nombre.
9. **Mensajes de WhatsApp: sin mayúsculas al arrancar oración y sin
   puntuación cargada (08/09/2026).** Nada de punto final después de
   cada frase ni de mayúscula inicial constante, eso "hace ver
   estructurado" según Diego. Escribir como se textea de verdad: todo en
   minúscula salvo nombres propios, comas sueltas nomás, una sola
   pregunta al final sin que parezca redactado.
10. **Español neutro cuando Diego lo pida (08/09/2026).** Usar "tú" en
    vez de "vos" y evitar modismos argentinos si lo pide puntualmente
    (no es la default, la default sigue siendo con "vos" para el
    catálogo de Hurlingham, que es público de Buenos Aires).

## Proceso en etapas (decidido 08/09/2026, a Diego le gusta trabajar así)

1. **Contacto y descubrimiento**, primer mensaje de outreach, y cuando
   contesta con interés, preguntar lo básico (cuántos productos, cobra en
   la página o coordina por WhatsApp, envío o retiro). Todavía sin
   cotizar nada acá.
2. **Propuesta y seña**, con esa info se arma el precio. Si acepta, se
   cobra una seña (30-50%) ANTES de tocar una sola línea con su marca,
   esto es lo que evita repetir lo que pasó con la página de Priscila
   (se armó todo gratis y después no se usó).
3. **Armado personalizado**, recién acá se agarra el demo genérico
   (`tienda-demo`) y se adapta: logo, colores, productos reales, forma de
   cobrar del cliente real.
4. **Revisión**, se muestra el resultado, el cliente pide ajustes.
   Definir de entrada cuántas rondas de cambios entran en el precio para
   que no se desborde el pedido.
5. **Entrega y saldo**, se publica la página en serio (dominio/hosting
   real, no más el demo genérico), se cobra el saldo restante, arranca el
   hosting mensual.
6. **Hosting y mantenimiento**, cobro recurrente mensual. Definir si
   entra algún cambio chico gratis por mes o todo cambio extra se cobra
   aparte.

## Lecciones de outreach en vivo (ir sumando acá)

- **08/09/2026, no soltar al lead que dice "me interesa pero estoy justa
  de plata".** Con Romina (Mundo Firulete) esa respuesta de ella era
  interés real, no un no. Diego le contestó "dale, no pasa nada,
  cualquier cosa me escribís", cierra la conversación de hecho. Lo
  correcto en Etapa 1 es seguir la charla: aclarar que no tiene que ser
  caro y preguntarle qué necesitaría, sin cotizar todavía. Un "no pasa
  nada" prematuro pierde leads que en realidad seguían abiertos.
- **09/09/2026, 180.000 ARS de armado espantó a Romina (Mundo Firulete).**
  Después de seguir la charla (leccion anterior), se le paso el costo
  (180k armado + hosting mensual) y contesto "Es mucho para mi. Te
  agradezco igual". Con este publico (emprendedoras chicas, algunas ya
  con freno de plata declarado antes), ese numero parece alto. Evaluar
  bajar el piso de entrada o tener una version mas chica/barata (menos
  productos, sin catalogo editable, etc.) para no perder leads por precio
  antes de mostrar valor real.
- **09/09/2026, criterio para decidir página web vs Glenox por tipo de
  negocio (Diego lo corrigió después de un primer intento mal repartido
  en el rubro Deco y Hogar).** No es "cualquier negocio con WhatsApp
  puede ir a cualquiera de los dos productos":
  - **Página web (catálogo + carrito)**: productos personalizables a
    medida que el cliente necesita **ver** antes de decidir — impresión
    3D, resina, grabado láser, piedras/acero, artesanías, decoración,
    ropa/estampado. El cliente quiere mirar fotos/variantes de un
    catálogo, no charlar con un bot.
  - **Glenox (chatbot)**: pymes chicas y medianas con **mucho volumen
    de consultas repetitivas simples** que hay que responder rápido, a
    cualquier hora — pedidos de comida, turnos, catálogo de precio fijo
    (almacén, peluquería, rotisería, y en general cualquier pyme con
    flujo constante de WhatsApp). El objetivo de Glenox NO es el
    kiosco puntual, es la pyme chica-mediana en general (corregido
    09/09/2026, Diego lo aclaró explícito).
  - Antes de armar los mensajes de un rubro nuevo, pensar primero a cuál
    de los dos tipos pertenece la mayoría de los negocios de ese rubro,
    no repartir a mitad y mitad por default.

## Dónde está todo (para no perder el hilo entre sesiones)

- **Outreach / mensajes / seguimiento de contactos**: vive en el repo
  `glenox`, no acá, `glenox/docs/outreach-villa-tesei-2026-09.md`,
  sección "Outreach paralelo: venta de páginas web". Ahí están los
  mensajes ya armados con links `wa.me` clickeables (abren WhatsApp con
  el texto cargado) para cada emprendimiento del catálogo Bien de
  Hurlingham (bien.hurlingham.gob.ar), con nombre, rubro y estado.
- **Este repo (`tienda-demo`)**: solo el producto en sí (`index.html`,
  `carrito.html`, `checkout.html`, `producto.html`, `admin/`, `assets/`)
  y este `CLAUDE.md`. Nada de estrategia de venta acá, eso va en glenox.
- **Chats de WhatsApp personales** (ej. la conversación con Priscila que
  reveló el freno del monotributo): si Diego sube un `.zip` de exportación
  de WhatsApp, es un archivo binario, hay que `unzip` primero, no se
  puede leer directo como texto (probado 08/09/2026 con el chat de
  Priscila). Guardar el hallazgo relevante en `glenox/CHANGELOG.md`
  (sección de insights de mercado), no dejarlo perdido en un chat.

## Comando `/tienda`

Cuando Diego escribe `/tienda`, releer este archivo entero primero, y
después `glenox/docs/outreach-villa-tesei-2026-09.md` (sección de venta
de páginas web) para tener el estado actual de a quién se le mandó
mensaje y quién contestó, antes de responder cualquier cosa sobre este
negocio.

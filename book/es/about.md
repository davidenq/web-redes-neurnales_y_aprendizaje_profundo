Las redes neuronales son uno de las paradigmas de programación más hermosos que se han inventado. En el enfoque tradicional de programación le decimos al computador que hacer, modularizando los grandes problemas en partes más pequeñas de tal forma que se puedan definir, con precisión, las tareas que el computador puede fácilmente realizar. Por el contrario, en una red neuronal no le decimos al computador como tiene que resolver los problemas, en lugar de ello, el computador aprende a través de la observación de los datos de tal forma que pueda averiguar y encontrar una solución al problema en cuestión.

Un aprendizaje automático basado en la observación de los datos suena bastante prometedor. Sin embargo, desde el 2006, no conocíamos como entrenar las redes neuronales para superar el enfoque más tradicional; con excepción de algunos problemas muy particulares y especializados. A partir del 2006, fueron desarrolladas nuevas técnicas de aprendizaje en las redes neuronales, ahora son conocidas como _Aprendizaje Profundo_. Estas técnicas, hoy en día, han sido mejoradas logrando un rendimiento excepcional para resolver muchos problemas importantes y que están enmarcados en campos tales como visión artificial, reconocimiento de voz, procesamiento natural del lenguaje, entre otros. Las técnicas de Aprendizaje Profundo están siendo constantemente desplegadas a gran escala por empresas como Google, Microsoft, Facebook y otras muchas más.

El propósito de este libro es ayudarte a dominar los conceptos más importantes de las redes neuronales, incluyendo técnicas modernas para el aprendizaje profundo. Despues de abordar todo el contenido del libro, incluyendo el desarrollo de los ejemplos, estarás en la capacidad de escribir código aplicables en las redes neuronales y aprendizaje profundo para solucionar problemas de reconocimiento de patrones complejos, inclusive atacar problemas que tu mismo generes de tu propia invención.

### Un enfoque orientado a principios

Una fuerte convicción subyace en este libro, y es que es mejor obtener un entendimiento sólido de los conceptos fundamentales de las Redes Neuronales y Aprendizaje Profundo, en lugar de una comprensión confusa de una larga lista de ideas. Si has entendido bien las ideas fundamentales, puedes rápidamente entender otros nuevos conceptos. En cuanto al lenguaje de programación, debes tener un dominio de la sintaxis básica, además conocer algunas librerías y manejar estructura de datos. Puedes tener una base de conocimiento muy pequeña acerca del lenguaje de programación dado que muchos lenguajes tienen enormes librerías estándar, pero si se trata de entender acerca de nuevas librerías y estructuras de datos podrías hacerlo rápidamente y fácilmente con las bases de conocimiento que tienes acerca de la programación. Sin embargo, enfáticamente, este libro no es un tutorial de como usar alguna librería en particular de redes neuronales.

Si estás aquí porque deseas aprender acerca de alguna librería en particular de redes neuronales, por favor ¡No leas este libro!. Ve y encuentra la biblioteca que deseas aprender, trabaja a través de los tutoriales y la documentación oficial de dicha librería. Pero !ten cuidado¡ mientras esto tiene un beneficio inmediato para resolver problemas, no tiene un beneficio en particular para entender lo que realmente está sucediendo en las redes neuronales. Si quieres entender lo que realmente sucede en las redes neuronales y que será información relevante por muchos años, entonces no aprendas acerca de como usar una librería, aprende las ideas fundamentales acerca de las redes neuronales y aprendizaje profundo y como trabajan. Tecnologías llegan y tecnologías se van, pero las ideas principales son duraderas y te beneficiarán mucho.

### Un enfoque práctico

Aprenderemos los principales conceptos detrás de las Redes Neuronales y Aprendizaje profundo atacando un problema en concreto: el problema de enseñar a un computador a reconocer dígitos escritos a mano. Este problema es extremadamente complicado de resolverlo usando un enfoque convencional de programación. Y aún, como veremos, esto puede ser resuelto bastante bien usando una simple red neuronal, con solo unas pocas decenas de lineas de código y ninguna librería en especial. Lo que es más, mejoraremos el programa a tarvés de varias iteraciones, incorporando gradualmente más y más de las ideás fundamentales acerca de las redes neuronales y aprendizaje profundo.
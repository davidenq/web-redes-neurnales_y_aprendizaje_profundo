
El sistema humano visual es una de las grandes maravillas en el mundo. Considera la siguiente secuencia de dígitos escritos a mano:

<center>

![](public/assets/images/digits1.jpg)

</center>

Con muy poco esfuerzo, la mayoria de la gente puede reconocer esos números e indicar que son: 504192, pero esto es fácilmente engañoso.
En cada hemisferio de nuestro cerebro, los seres humanos tenemos una cortesa visual primaría; es conocida como V1 y contiene aproximadamente unas 140 milliones de neuronas con aproximadamente unas 10 billones de conexiones entre ellas. Sin embargo, la visión humana no implica una sola V1, sino una serie de cortezas visuales - V2, V3, V4 y V5 - haciendo progresivamente procesamiento de imágenes más complejas. Llevamos en nuestra cabeza un supercomputador ajustado por la evolución de más de cien millones de años y magníficamente adaptandose para comprender el mundo visual.

El reconocimiento de dígitos escritos a mano no es una tarea sencilla, por el contrario, los seres humanos somos asombrosos y sorprendentemente buenos para hacer que las cosas tengan sentido de lo que nuestros ojos nos muestran, no obstante, casi todo el trabajo se lo realiza de una forma inconsciente. Y usualmente no somos capaces de apreciar como, nuestro sistema visual, resuelve un problema bastante difícil de una forma relativamente sencilla.

La dificultad visual que conlleva el reconocimiento de patrones se hace bastante evidente si se intenta escribir un programa de computador que realize el trabajo de reconocer los dígitos escritos a mano, como los mostrados anterioremente. Lo que parece fácil cuando lo hacemos notroso mismos de repente se vuelve extremadamente difícil. Una simple intuición acerca de como reconocer formas - "un 9 tiene un lazo en la parte superior y una barra de forma verticial en la parte inferior derecha" - sin embargo, esta descripción, resulta no ser tan simple como parece para poder ser expresada a través de un algoritmo. Cuando se intenta realizar de forma precisa esas reglas, se perderá rápidamente en una maraña de excepciones, salvedades y casos especiales. Esto parece no tener esperanza alguna.

Las redes neuronales atácan el problema de una manera diferente. La idea es tomar una gran cantidad de dígitos escritos a mano que servirán como patrones o ejemplos de entrenamiento,

<center>

![](public/assets/images/mnist_100_digits.png)

</center>

y luego desarrollar un sistema el cuál pueda aprender de estos ejemplos de entrenamiento. En otras palabras, la red neuronal usará estos ejemplos y automáticamente podrá deducir reglas de tal manera que le permitan reconocer dígitos escritos a mano. Además, si se incrementa el número de ejemplos de entrenamiento, la red puede aprender más y así mejorar su exactitud a la hora del reconocimiento. Así que mientras he mostrado anteriormente sólo 100 dígitos de entrenamiento, talvés podríamos hacer un mejor sistema de reconocimiento mediante el uso de miles, o incluso millones o miles de millones de ejemplos de entrenamiento.

En este capítulo escribiremos un programa implementando una red neuronal que aprenda a reconocer dígitos escritos a mano. El programa tiene únicamente 74 líneas de código y no usa ninguna librería de redes neuronales en particular. Sin embargo, este pequeño programa podrá reconocer dígitos escritos a mano con una exactitud de más del 96 por ciento sin intervensión humana. Además en capítulos posteriores desarrollaremos las ideas permitiendo una mejora de hasta el 99 por ciento del reconocimiento de dígitos escritos a mano. De hecho, las mejores redes neuronales comerciales son tan buenas que son utilizadas por bancos para procesar cheques y por las oficinas de correo postal para reconocer direcciones.

Estarémos enfocados en el reconocimiento de escritura a mano puesto que es un excelente problema prototípo para aprender de forma general acerca de las redes neuronales. Como un prototipo que predonima, es importante mencionar sobre un punto importante: Es un desafío- no es una tarea sencilla reconocer dígitos escritos a mano - pero tampoco es demasiado dificil, no requeriere una solución extremadamente complicada con un enorme poder computacional. Además, es un buen inicio, en gran manera, para desarrollar técnicas avanzadas como el aprendizaje profundo, por ejemplo. Y así, através del libro volveremos repetidas veces a este problema - "reconocimiento de escritura". Más adelante en el libro, discutiremos cómo estas ideas pueden aplicarse a otros problemas de visión por computador y también en el habla, el procesamiento del lenguaje natural y otros dominos.

Por supuesto, si el punto principal del capítulo fue sólo escribir un programa de ordenador para realizar el reconocimiento de dígitos escritos a mano, entonces el capítulo sería mucho más corto. Pero esto no es así puesto que en el transcurso de este libro desarrollaremos muchas ideas importantes sobre las redes neuronales, incluyendo dos importantes tipos de neurona artificial (el perceptrón y la neurona sigmoide) y el algoritmo estándar de aprendizaje de redes neuronales conocido como descenso de gradiente estocástico. Además, me centraré en explicar _por qué_ se hacen las cosas de esa manera y en la construcción y percepción de una red neuronal. Todo esto requiere una larga discusión a diferencia de si solo se presentara la mecánica básica de lo que está haciendo, pero vale la pena porque tendrás una compresión mucho más profunda. Al finalizar el capítulo estaremos en una posición tal que nos permitirá entender que es el aprendizaje profundo y por qué es tan importante.


## <a name="perceptrons"></a>[Percentrones](#perceptrons)


¿Qué es una red neuronal? Para empezar, explicaré un tipo de neurona artificial llamada _percentron_. El perceptron fue [desarrollado](http://books.google.ca/books/about/Principles_of_neurodynamics.html?id=7FhRAAAAMAAJ) entre los años 1950 y 1960 por el científico [Frank Rosenblatt](http://en.wikipedia.org/wiki/Frank_Rosenblatt), quién fue inspirado por el [trabajo](http://scholar.google.ca/scholar?cluster=4035975255085082870) realizado por [Warren McCulloch](https://es.wikipedia.org/wiki/Warren_McCulloch) y [Walter Pitts](http://en.wikipedia.org/wiki/Walter_Pitts), y que trata acerca de las teorías del cerebro y la neurona como la unidad más básica del cerebro. Hoy en día, es más comun usar otro modelo de neurona artificial - en este libro, y en otros muchos y modernos trabajos sobre redes neuronales, el principal modelo de neurona usada es llamada _neurona sigmoide_. Irémos en breve a tocar el tema de las Neuronas Sigmoide. Pero para entender porque son definidas de esa manera, vale la pena tomarse el tiempo necesario y entender primero el percentron.

Así que ¿Cómo trabaja un percetron? Un percetrón tiene algunas entradas binarias, @x_1, x_2,...,@ y produce una única salida binaria:

<center>

![](public/assets/images/tikz0.png)

</center>

En el ejemplo se muestra un percentron con 3 entradas @x_1, x_2, x_3@ En general, esto podría tener menos o más entradas. Rosenblatt introdujo los llamados _pesos_, @w_1,w_2, w_3,...,@ que no son más que valores numéricos asociados a cada una de sus correspondientes entradas, además estos pesos expresan la importancia de cada valor de entrada. A la salida de la neurona se tiene uno de dos posibles valores, @0@ o @1@. Este valor queda determinado por el resultado de la suma ponderada entre el producto de los pesos y los parámetros de entrada. Matemáticamente queda expresado como: @sum_j w_j x_j@ Es decir, si este resultado es menor o mayor que un cierto _valor umbral_, entonces se tendrá a la salida o @0@ o @1@. Rosenblatt lo propuso como regla simple para calcular la salida. Para definirlo en términos matemáticos más precisos se tiene que:

% `salida` = { 0 if sum_j w_jx_j ≤ `umbral` ; 1 if sum_j w_jx_j > `umbral`%

Esto es todo lo que hay acerca de cómo funciona un perceptron. Como se puede observar en la ecuación anterior, es un modelo matemático bastante sencillo.

Una manera en la que puedes pensar acerca del perceptron es que es un dispositivo que toma desiciones examinando los datos de entrada. Permíteme dar un ejemplo, pero no es un ejemplo muy realista, sin embargo, es fácil de entender, y pronto daré ejemplos mucho más realistas.

Supongamos que se acerca el fin de semana, y has oído que se va a llevar a cabo en tu ciudad un festival de queso, y a tí, te encanta el queso. Entonces, estás tratando de decidir si vas o no al festival. Para tomar una decisión debes examinar tres factores importantes:

1.  ¿El clima será bueno? ¿Hará un bonito día?
2.  ¿Tu enamorada (o) deseará acompañarte?
3.  ¿Hay transporte público cerca del festival? (No tienes un vehículo propio).

Podemos representar esos tres factores que incidirán en tu respuesta por una correspondiente variable binaria @x_1, x_2@, y @x_3@. Por ejemplo, tenemos @x_1 = 1@ si el clima es bueno, y @x_1 = 0@ si no lo es. De forma similar, @x_2 = 1@ si tu enamorada(o) desea ir contigo, y @x_2 = 0@ si no desea. Y nuevamente, de forma similar para el transporte público y su correspondiente variable binaria @x_3@.

Ahora bien, suponiendo que verdaderamente adoras tanto el queso que estarías muy contento de ir al festival incluso si tu enamorada(o) no le interesa ir por cualquiera que fuera el motivo, o aun si es difícil llegar al festival. Pero por otro lado, talvés detestas tanto el mal tiempo que no habría manera de que vayas al festival si es que realmente no hace un bonito día. Puedes usar el modelo perceptron para este tipo de decisiones. Una manera de hacer esto es seleccionar un peso @w_1 = 6@ para el clima y @w_2 = 2@ y @w_3 = 2@ para los otros casos, respectivamente. El valor más grande que corresponde a @w_1@, indica que el clima tiene mayor importancia, inclusive más importante que si tu enamorada(o) decide ir o no contigo, o si es que hay o no tranporte disponible y cercano al festival. Por último, supongamos que elegiste 5 como el valor umbral (límite). Con estos valores seleccionados, el percetrón implementa el modelo deseado para la toma de decisiones, obtener @1@ cada vez que el clima es bueno, y @0@ si no lo es. No importa que se obtenga a la salida con los otros factores, es decir, si tu enamorada(a) quiere ir o no, o si hay transporte disponible y cercano o no lo hay.

Al variar los pesos y el valor de umbral, podemos conseguir diferentes resultados en la toma de decisiones. Por ejemplo, supongamos que en lugar de escoger @5@ como el valor umbral, ahora elíges @3@. Entonces, el perceptron podría decedir que deberías ir al festival siempre que haga un buen día _o_ cuando los otros dos factores se cumplan, es decir, habrá transporte público disponible _y_ tu enamorada(o) está dispuesta(o) a ir contigo. En otras palabras, sería un modelo de toma de decisiones diferente puesto que el valor de umbral cáe en un valor medio pues estás más dispuesto a ir al festival.

Obviamente, ¡el perceptron no es un modelo completo de toma de decisiones humana! Pero en la ilustración del ejemplo, vemos como un perceptron puede ponderar diferentes tipos de certidumbres para tomar decisiones. Y debe parecer meritorio que una compleja red de perceptrones pueda tomar decisiones mucho más sutiles:
<center>

![](public/assets/images/tikz1.png)

</center>
En esta red, la primera columna de perceptrones - lo que llamarémos la primera capa de perceptrones - esta tomando 3 decisiones muy simples, ponderando los parámetros de entrada, particularmente para este caso son 5. Y ¿En cuanto a la segunda capa de perceptrones? Bueno, cada uno de estos perceptrones está tomando una decisión a través de la ponderación del resultado de la primera capa que previamente ya tomó decisiones. De este modo un perceptrón en la segunda capa, en comparación con uno de la primera, puede tomar una decisión con un nivel de abstración mucho más complejo. Incluso, decisiones más complejas pueden ser hechas por el perceptrón de la tercera capa. Así, una red de muchas capas de perceptrones puede participar en una muy elaborada toma de decisiones.

A propósito, cuando definí percetrones, dije que un percetrón tiene una única salida. En la red anterior de perceptrones se puede observar como cada perceptrón tiene multiples salidas. De hecho no son varias salidas, sino es una única salida, pero esa única salida va como entrada a cada perceptrón de la siguiente capa. Multiples flechas de salida son simplemente un modo útil de representar que esa salida formará parte de una entrada en cada percetrón. Es menos difícil que trazar una simple línea de salida el cual luego se divide en más lineas.

Simplifiquemos la manera en que describimos a los percetrones. La condición @sum_j w_j x_j > `umbral`@ es un poco "incómoda", y podemos hacer dos cambios notables para simplificar esto. El primera cambio es escribir @sum_j w_j x_j@ como un producto punto, es decir, @w*x == sum_j w_j x_j@, donde @w@ y @x@ son vectores cuyas componentes son los pesos y las entradas, respectivamente. El segundo cambio es mover el valor umbral al otro lado de la desigualdad, y sustituirlo por lo que se conoce como _bías_ de un percetrón, @b == -`umbral`@. Usando _bías_ en representación del umbral, la formula del perceptrón ahora se puede escribir como sígue:

%`salida` = {0 if w*x+b ≤ 0; 1 if w*x + b > 0%

Puedes pensar que bías es como una medida de lo fácil que es conseguir que el percetrón tenga a la salida un @1@, cuando la suma de las otras entradas es cero. Para ponerlo en terminos mucho más biológicos, bías es la medida de cuan fácil es conseguir que el perceptron se ejecute. Para un percetrón con el valor de _bias_ muy grande, es muy fácil obtener a la salida un @1@.

But if the bias is very negative, then it's difficult for the perceptron to output a @1@. Obviously, introducing the bias is only a small change in how we describe perceptrons, but we'll see later that it leads to further notational simplifications. Because of this, in the remainder of the book we won't use the threshold, we'll always use the bias.

I've described perceptrons as a method for weighing evidence to make decisions. Another way perceptrons can be used is to compute the elementary logical functions we usually think of as underlying computation, functions such as `AND`, `OR`, and `NAND`. For example, suppose we have a perceptron with two inputs, each with weight @-2@, and an overall bias of @3@. Here's our perceptron:

<center>

![](public/assets/images/tikz2.png)

</center>

Then we see that input @00@ produces output @1@, since @(-2)*0+(-2)*0+3 = 3@ is positive. Here, I've introduced the @*@ symbol to make the multiplications explicit. Similar calculations show that the inputs @01@ and @10@ produce output @1@. But the input @11@ produces output @0@, since @(-2)*1+(-2)*1+3 = -1@ is negative. And so our perceptron implements a `NAND` gate!

<a name="universality"></a>

The `NAND` example shows that we can use perceptrons to compute simple logical functions. In fact, we can use networks of perceptrons to compute _any_ logical function at all. The reason is that the `NAND` gate is universal for computation, that is, we can build any computation up out of `NAND` gates. For example, we can use `NAND` gates to build a circuit which adds two bits, @x_1@ and @x_2@. This requires computing the bitwise sum, @x_1 o+ x_2@, as well as a carry bit which is set to @1@ when both @x_1@ and @x_2@ are @1@, i.e., the carry bit is just the bitwise product @x_1 x_2@:

<center>

![](public/assets/images/tikz3.png)

</center>

To get an equivalent network of perceptrons we replace all the `NAND` gates by perceptrons with two inputs, each with weight @-2@, and an overall bias of @3@. Here's the resulting network. Note that I've moved the perceptron corresponding to the bottom right `NAND` gate a little, just to make it easier to draw the arrows on the diagram:

<center>

![](public/assets/images/tikz4.png)

</center>

One notable aspect of this network of perceptrons is that the output from the leftmost perceptron is used twice as input to the bottommost perceptron. When I defined the perceptron model I didn't say whether this kind of double-output-to-the-same-place was allowed. Actually, it doesn't much matter. If we don't want to allow this kind of thing, then it's possible to simply merge the two lines, into a single connection with a weight of -4 instead of two connections with -2 weights. (If you don't find this obvious, you should stop and prove to yourself that this is equivalent.) With that change, the network looks as follows, with all unmarked weights equal to -2, all biases equal to 3, and a single weight of -4, as marked:

<center>

![](public/assets/images/tikz5.png)

</center>

Up to now I've been drawing inputs like @x_1@ and @x_2@ as variables floating to the left of the network of perceptrons. In fact, it's conventional to draw an extra layer of perceptrons - the _input layer_ - to encode the inputs:

<center>!

[](public/assets/images/tikz6.png)

</center>

This notation for input perceptrons, in which we have an output, but no inputs,

<center>

![](public/assets/images/tikz7.png)

</center>

is a shorthand. It doesn't actually mean a perceptron with no inputs. To see this, suppose we did have a perceptron with no inputs. Then the weighted sum @sum_j w_j x_j@ would always be zero, and so the perceptron would output @1@ if @b > 0@, and @0@ if @b <= 0@. That is, the perceptron would simply output a fixed value, not the desired value (@x_1@, in the example above). It's better to think of the input perceptrons as not really being perceptrons at all, but rather special units which are simply defined to output the desired values, @x_1, x_2,...@.

The adder example demonstrates how a network of perceptrons can be used to simulate a circuit containing many `NAND` gates. And because `NAND` gates are universal for computation, it follows that perceptrons are also universal for computation.

The computational universality of perceptrons is simultaneously reassuring and disappointing. It's reassuring because it tells us that networks of perceptrons can be as powerful as any other computing device. But it's also disappointing, because it makes it seem as though perceptrons are merely a new type of `NAND` gate. That's hardly big news!

However, the situation is better than this view suggests. It turns out that we can devise _learning algorithms_ which can automatically tune the weights and biases of a network of artificial neurons. This tuning happens in response to external stimuli, without direct intervention by a programmer. These learning algorithms enable us to use artificial neurons in a way which is radically different to conventional logic gates. Instead of explicitly laying out a circuit of `NAND` and other gates, our neural networks can simply learn to solve problems, sometimes problems where it would be extremely difficult to directly design a conventional circuit.

### <a name="sigmoid_neurons"></a>[Neuronas Sigmoide](#sigmoid_neurons)

Learning algorithms sound terrific. But how can we devise such algorithms for a neural network? Suppose we have a network of perceptrons that we'd like to use to learn to solve some problem. For example, the inputs to the network might be the raw pixel data from a scanned, handwritten image of a digit. And we'd like the network to learn weights and biases so that the output from the network correctly classifies the digit. To see how learning might work, suppose we make a small change in some weight (or bias) in the network. What we'd like is for this small change in weight to cause only a small corresponding change in the output from the network. As we'll see in a moment, this property will make learning possible. Schematically, here's what we want (obviously this network is too simple to do handwriting recognition!):

<center>

![](public/assets/images/tikz8.png)

</center>

If it were true that a small change in a weight (or bias) causes only a small change in output, then we could use this fact to modify the weights and biases to get our network to behave more in the manner we want. For example, suppose the network was mistakenly classifying an image as an "8" when it should be a "9". We could figure out how to make a small change in the weights and biases so the network gets a little closer to classifying the image as a "9". And then we'd repeat this, changing the weights and biases over and over to produce better and better output. The network would be learning.

The problem is that this isn't what happens when our network contains perceptrons. In fact, a small change in the weights or bias of any single perceptron in the network can sometimes cause the output of that perceptron to completely flip, say from @0@ to @1@. That flip may then cause the behaviour of the rest of the network to completely change in some very complicated way. So while your "9" might now be classified correctly, the behaviour of the network on all the other images is likely to have completely changed in some hard-to-control way. That makes it difficult to see how to gradually modify the weights and biases so that the network gets closer to the desired behaviour. Perhaps there's some clever way of getting around this problem. But it's not immediately obvious how we can get a network of perceptrons to learn.

We can overcome this problem by introducing a new type of artificial neuron called a _sigmoid_ neuron. Neuronas Sigmoid are similar to perceptrons, but modified so that small changes in their weights and bias cause only a small change in their output. That's the crucial fact which will allow a network of Neuronas Sigmoid to learn.

Okay, let me describe the sigmoid neuron. We'll depict Neuronas Sigmoid in the same way we depicted perceptrons:

<center>

![](public/assets/images/tikz9.png)

</center>

Just like a perceptron, the sigmoid neuron has inputs, @x_1, x_2, ...,@. But instead of being just @0@ or @1@, these inputs can also take on any values _between_ @0@ and @1@. So, for instance, @0.638...@ is a valid input for a sigmoid neuron. Also just like a perceptron, the sigmoid neuron has weights for each input, @w_1, w_2, ...@, and an overall bias, @b@. But the output is not @0@ or @1@. Instead, it's @sigma(w * x+b)@, where @sigma@ is called the _sigmoid function_* <span class="marginnote">*Incidentally, @sigma@ is sometimes called the _logistic function_, and this new class of neurons called _logistic neurons_. It's useful to remember this terminology, since these terms are used by many people working with neural nets. However, we'll stick with the sigmoid terminology.</span>, and is defined by:

<a class="displaced_anchor" name="eqtn3"></a>

%sigma(z) == 1/{1+e^{-z}}        (3)%


To put it all a little more explicitly, the output of a sigmoid neuron with inputs @x_1,x_2,...@, weights @w_1,w_2,...@, and bias @b@ is

<a class="displaced_anchor" name="eqtn4"></a>

%1/{1+exp(-sum_j w_jx_j -b)}        (4)%


At first sight, Neuronas Sigmoid appear very different to perceptrons. The algebraic form of the sigmoid function may seem opaque and forbidding if you're not already familiar with it. In fact, there are many similarities between perceptrons and Neuronas Sigmoid, and the algebraic form of the sigmoid function turns out to be more of a technical detail than a true barrier to understanding.

To understand the similarity to the perceptron model, suppose @z == w * x + b@ is a large positive number. Then @e^{-z} ≈ 0 @ and so @sigma(z) ≈ 1@. In other words, when @z = w * x+b@ is large and positive, the output from the sigmoid neuron is approximately @1@, just as it would have been for a perceptron. Suppose on the other hand that @z = w * x+b@ is very negative. Then @e^{-z} rarr oo@, and @sigma(z) ≈ 0@. So when @z = w * x +b@ is very negative, the behaviour of a sigmoid neuron also closely approximates a perceptron. It's only when @w * x+b@ is of modest size that there's much deviation from the perceptron model.

What about the algebraic form of @sigma@? How can we understand that? In fact, the exact form of @sigma@ isn't so important - what really matters is the shape of the function when plotted. Here's the shape:

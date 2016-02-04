If @sigma@ had in fact been a step function, then the sigmoid neuron would _be_ a perceptron, since the output would be @1@ or @0@ depending on whether @w* x+b@ was positive or negative* <span class="marginnote">*Actually, when @w * x +b = 0@ the perceptron outputs @0@, while the step function outputs @1@. So, strictly speaking, we'd need to modify the step function at that one point. But you get the idea.</span>. By using the actual @sigma@ function we get, as already implied above, a smoothed out perceptron. Indeed, it's the smoothness of the @sigma@ function that is the crucial fact, not its detailed form. The smoothness of @sigma@ means that small changes @Delta w_j@ in the weights and @Delta b@ in the bias will produce a small change @Delta output@ in the output from the neuron. In fact, calculus tells us that @Delta output@ is well approximated by

<a class="displaced_anchor" name="eqtn5"></a>

%Delta output ≈ sum_j(deloutput)/(delw_j) Delta w_j + (del output)/(del b) Delta b,        (5)%

where the sum is over all the weights, @w_j@, and @(deloutput)/(del w_j)@ and @(deloutput)/(delb)@ denote partial derivatives of the output with respect to @w_j@ and @b@, respectively. Don't panic if you're not comfortable with partial derivatives! While the expression above looks complicated, with all the partial derivatives, it's actually saying something very simple (and which is very good news): @Delta output@ is a _linear function_ of the changes @Delta w_j@ and @Delta b@ in the weights and bias. This linearity makes it easy to choose small changes in the weights and biases to achieve any desired small change in the output. So while Neuronas Sigmoid have much of the same qualitative behaviour as perceptrons, they make it much easier to figure out how changing the weights and biases will change the output.

If it's the shape of @sigma@ which really matters, and not its exact form, then why use the particular form used for @sigma@ in Equation <span id="margin_850263336921_reveal" class="equation_link">(3)</span><span id="margin_850263336921" class="marginequation" style="display: none;"> [ @sigma(z) == 1/{1+e^{-z}}@ ](#eqtn3) </span> ? In fact, later in the book we will occasionally consider neurons where the output is @f(w * x + b)@ for some other _activation function_ @f(*)@. The main thing that changes when we use a different activation function is that the particular values for the partial derivatives in Equation
<span id="margin_444952422305_reveal" class="equation_link">(5)</span><span id="margin_444952422305" class="marginequation" style="display: none;">[ @Delta output ≈ sum_j(deloutput)/(delw_j) Delta w_j + (del output)/(del b) Delta b@ ](#eqtn5)</span> change. It turns out that when we compute those partial derivatives later, using @sigma@ will simplify the algebra, simply because exponentials have lovely properties when differentiated. In any case, @sigma@ is commonly-used in work on neural nets, and is the activation function we'll use most often in this book.

How should we interpret the output from a sigmoid neuron? Obviously, one big difference between perceptrons and Neuronas Sigmoid is that Neuronas Sigmoid don't just output @0@ or @1@. They can have as output any real number between @0@ and @1@, so values such as @0.173...@ and @0.689...@ are legitimate outputs. This can be useful, for example, if we want to use the output value to represent the average intensity of the pixels in an image input to a neural network. But sometimes it can be a nuisance. Suppose we want the output from the network to indicate either "the input image is a 9" or "the input image is not a 9". Obviously, it'd be easiest to do this if the output was a @0@ or a @1@, as in a perceptron. But in practice we can set up a convention to deal with this, for example, by deciding to interpret any output of at least @0.5@ as indicating a "9", and any output less than @0.5@ as indicating "not a 9". I'll always explicitly state when we're using such a convention, so it shouldn't cause any confusion.

#### <a name="exercises_191892"></a>[Exercises](#exercises_191892)

*   **Neuronas Sigmoid simulating perceptrons, part I**
    Suppose we take all the weights and biases in a network of perceptrons, and multiply them by a positive constant, @c > 0@. Show that the behaviour of the network doesn't change.
*   **Neuronas Sigmoid simulating perceptrons, part II**
    Suppose we have the same setup as the last problem - a network of perceptrons. Suppose also that the overall input to the network of perceptrons has been chosen. We won't need the actual input value, we just need the input to have been fixed. Suppose the weights and biases are such that @w*x + b != 0@ for the input @x@ to any particular perceptron in the network. Now replace all the perceptrons in the network by Neuronas Sigmoid, and multiply the weights and biases by a positive constant @c > 0@. Show that in the limit as @c rarr oo@ the behaviour of this network of Neuronas Sigmoid is exactly the same as the network of perceptrons. How can this fail when @w*x + b = 0@ for one of the perceptrons?

### <a name="the_architecture_of_neural_networks"></a>[Arquitectura de las redes neuronales](#the_architecture_of_neural_networks)

In the next section I'll introduce a neural network that can do a pretty good job classifying handwritten digits. In preparation for that, it helps to explain some terminology that lets us name different parts of a network. Suppose we have the network:

<center>

![](public/assets/images/tikz10.png)

</center>

As mentioned earlier, the leftmost layer in this network is called the input layer, and the neurons within the layer are called _input neurons_. The rightmost or _output_ layer contains the _output neurons_, or, as in this case, a single output neuron. The middle layer is called a _hidden layer_, since the neurons in this layer are neither inputs nor outputs. The term "hidden" perhaps sounds a little mysterious - the first time I heard the term I thought it must have some deep philosophical or mathematical significance - but it really means nothing more than "not an input or an output". The network above has just a single hidden layer, but some networks have multiple hidden layers. For example, the following four-layer network has two hidden layers:

<center>

![](public/assets/images/tikz11.png)

</center>

Somewhat confusingly, and for historical reasons, such multiple layer networks are sometimes called _multilayer perceptrons_ or _MLPs_, despite being made up of Neuronas Sigmoid, not perceptrons. I'm not going to use the MLP terminology in this book, since I think it's confusing, but wanted to warn you of its existence.

The design of the input and output layers in a network is often straightforward. For example, suppose we're trying to determine whether a handwritten image depicts a "9" or not. A natural way to design the network is to encode the intensities of the image pixels into the input neurons. If the image is a @64@ by @64@ greyscale image, then we'd have @4,096 = 64x64@ input neurons, with the intensities scaled appropriately between @0@ and @1@. The output layer will contain just a single neuron, with output values of less than @0.5@ indicating "input image is not a 9", and values greater than @0.5@ indicating "input image is a 9 ".

While the design of the input and output layers of a neural network is often straightforward, there can be quite an art to the design of the hidden layers. In particular, it's not possible to sum up the design process for the hidden layers with a few simple rules of thumb. Instead, neural networks researchers have developed many design heuristics for the hidden layers, which help people get the behaviour they want out of their nets. For example, such heuristics can be used to help determine how to trade off the number of hidden layers against the time required to train the network. We'll meet several such design heuristics later in this book.

Up to now, we've been discussing neural networks where the output from one layer is used as input to the next layer. Such networks are called _feedforward_ neural networks. This means there are no loops in the network - information is always fed forward, never fed back. If we did have loops, we'd end up with situations where the input to the @\sigma@ function depended on the output. That'd be hard to make sense of, and so we don't allow such loops.

However, there are other models of artificial neural networks in which feedback loops are possible. These models are called [recurrent neural networks](http://en.wikipedia.org/wiki/Recurrent_neural_network). The idea in these models is to have neurons which fire for some limited duration of time, before becoming quiescent. That firing can stimulate other neurons, which may fire a little while later, also for a limited duration. That causes still more neurons to fire, and so over time we get a cascade of neurons firing. Loops don't cause problems in such a model, since a neuron's output only affects its input at some later time, not instantaneously.

Recurrent neural nets have been less influential than feedforward networks, in part because the learning algorithms for recurrent nets are (at least to date) less powerful. But recurrent networks are still extremely interesting. They're much closer in spirit to how our brains work than feedforward networks. And it's possible that recurrent networks can solve important problems which can only be solved with great difficulty by feedforward networks. However, to limit our scope, in this book we're going to concentrate on the more widely-used feedforward networks.

### <a name="a_simple_network_to_classify_handwritten_digits"></a>[Una red simple para clasificar dígitos escritos a mano](#a_simple_network_to_classify_handwritten_digits)

Having defined neural networks, let's return to handwriting recognition. We can split the problem of recognizing handwritten digits into two sub-problems. First, we'd like a way of breaking an image containing many digits into a sequence of separate images, each containing a single digit. For example, we'd like to break the image

<center>

![](public/assets/images/digits.png)

</center>

into six separate images,

<center>

![](public/assets/images/digits_separate.png)

</center>

We humans solve this _segmentation problem_ with ease, but it's challenging for a computer program to correctly break up the image. Once the image has been segmented, the program then needs to classify each individual digit. So, for instance, we'd like our program to recognize that the first digit above,

<center>

![](public/assets/images/mnist_first_digit.png)

</center>

is a 5.

We'll focus on writing a program to solve the second problem, that is, classifying individual digits. We do this because it turns out that the segmentation problem is not so difficult to solve, once you have a good way of classifying individual digits. There are many approaches to solving the segmentation problem. One approach is to trial many different ways of segmenting the image, using the individual digit classifier to score each trial segmentation. A trial segmentation gets a high score if the individual digit classifier is confident of its classification in all segments, and a low score if the classifier is having a lot of trouble in one or more segments. The idea is that if the classifier is having trouble somewhere, then it's probably having trouble because the segmentation has been chosen incorrectly. This idea and other variations can be used to solve the segmentation problem quite well. So instead of worrying about segmentation we'll concentrate on developing a neural network which can solve the more interesting and difficult problem, namely, recognizing individual handwritten digits.

To recognize individual digits we will use a three-layer neural network:

<center>

![](public/assets/images/tikz12.png)

</center>

The input layer of the network contains neurons encoding the values of the input pixels. As discussed in the next section, our training data for the network will consist of many @28@ by @28@ pixel images of scanned handwritten digits, and so the input layer contains @784 = 28 x 28@ neurons. For simplicity I've omitted most of the @784@ input neurons in the diagram above. The input pixels are greyscale, with a value of @0.0@ representing white, a value of @1.0@ representing black, and in between values representing gradually darkening shades of grey.

The second layer of the network is a hidden layer. We denote the number of neurons in this hidden layer by @n@, and we'll experiment with different values for @n@. The example shown illustrates a small hidden layer, containing just @n = 15@ neurons.

The output layer of the network contains 10 neurons. If the first neuron fires, i.e., has an output @~~ 1@, then that will indicate that the network thinks the digit is a @0@. If the second neuron fires then that will indicate that the network thinks the digit is a @1@. And so on. A little more precisely, we number the output neurons from @0@ through @9@, and figure out which neuron has the highest activation value. If that neuron is, say, neuron number @6@, then our network will guess that the input digit was a @6@. And so on for the other output neurons.

You might wonder why we use @10@ output neurons. After all, the goal of the network is to tell us which digit (@0, 1, 2,..., 9@) corresponds to the input image. A seemingly natural way of doing that is to use just @4@ output neurons, treating each neuron as taking on a binary value, depending on whether the neuron's output is closer to @0@ or to @1@. Four neurons are enough to encode the answer, since @2^4 = 16@ is more than the 10 possible values for the input digit. Why should our network use @10@ neurons instead? Isn't that inefficient? The ultimate justification is empirical: we can try out both network designs, and it turns out that, for this particular problem, the network with @10@ output neurons learns to recognize digits better than the network with @4@ output neurons. But that leaves us wondering _why_ using @10@ output neurons works better. Is there some heuristic that would tell us in advance that we should use the @10@-output encoding instead of the @4@-output encoding?

To understand why we do this, it helps to think about what the neural network is doing from first principles. Consider first the case where we use @10@ output neurons. Let's concentrate on the first output neuron, the one that's trying to decide whether or not the digit is a @0@. It does this by weighing up evidence from the hidden layer of neurons. What are those hidden neurons doing? Well, just suppose for the sake of argument that the first neuron in the hidden layer detects whether or not an image like the following is present:

<center>

![](public/assets/images/mnist_top_left_feature.png)

</center>

It can do this by heavily weighting input pixels which overlap with the image, and only lightly weighting the other inputs. In a similar way, let's suppose for the sake of argument that the second, third, and fourth neurons in the hidden layer detect whether or not the following images are present:

<center>

![](public/assets/images/mnist_other_features.png)

</center>

As you may have guessed, these four images together make up the @0@ image that we saw in the line of digits shown [earlier](#complete_zero):

<center>

![](public/assets/images/mnist_complete_zero.png)

</center>

So if all four of these hidden neurons are firing then we can conclude that the digit is a @0@. Of course, that's not the _only_ sort of evidence we can use to conclude that the image was a @0@ - we could legitimately get a @0@ in many other ways (say, through translations of the above images, or slight distortions). But it seems safe to say that at least in this case we'd conclude that the input was a @0@.

Supposing the neural network functions in this way, we can give a plausible explanation for why it's better to have @10@ outputs from the network, rather than @4@. If we had @4@ outputs, then the first output neuron would be trying to decide what the most significant bit of the digit was. And there's no easy way to relate that most significant bit to simple shapes like those shown above. It's hard to imagine that there's any good historical reason the component shapes of the digit will be closely related to (say) the most significant bit in the output.

Now, with all that said, this is all just a heuristic. Nothing says that the three-layer neural network has to operate in the way I described, with the hidden neurons detecting simple component shapes. Maybe a clever learning algorithm will find some assignment of weights that lets us use only @4@ output neurons. But as a heuristic the way of thinking I've described works pretty well, and can save you a lot of time in designing good neural network architectures.

#### <a name="exercise_513527"></a>[Exercise](#exercise_513527)

*   There is a way of determining the bitwise representation of a digit by adding an extra layer to the three-layer network above. The extra layer converts the output from the previous layer into a binary representation, as illustrated in the figure below. Find a set of weights and biases for the new output layer. Assume that the first @3@ layers of neurons are such that the correct output in the third layer (i.e., the old output layer) has activation at least @0.99@, and incorrect outputs have activation less than @0.01@.

<center>

![](public/assets/images/tikz13.png)

</center>

### <a name="learning_with_gradient_descent"></a>[Aprendiendo con gradiente descendiente](#learning_with_gradient_descent)

Now that we have a design for our neural network, how can it learn to recognize digits? The first thing we'll need is a data set to learn from - a so-called training data set. We'll use the [MNIST data set](http://yann.lecun.com/exdb/mnist/), which contains tens of thousands of scanned images of handwritten digits, together with their correct classifications. MNIST's name comes from the fact that it is a modified subset of two data sets collected by [NIST](http://en.wikipedia.org/wiki/National_Institute_of_Standards_and_Technology), the United States' National Institute of Standards and Technology. Here's a few images from MNIST:

<center>

![](public/assets/images/digits_separate.png)

</center>

As you can see, these digits are, in fact, the same as those shown at the [beginning of this chapter](#complete_zero) as a challenge to recognize. Of course, when testing our network we'll ask it to recognize images which aren't in the training set!

The MNIST data comes in two parts. The first part contains 60,000 images to be used as training data. These images are scanned handwriting samples from 250 people, half of whom were US Census Bureau employees, and half of whom were high school students. The images are greyscale and 28 by 28 pixels in size. The second part of the MNIST data set is 10,000 images to be used as test data. Again, these are 28 by 28 greyscale images. We'll use the test data to evaluate how well our neural network has learned to recognize digits. To make this a good test of performance, the test data was taken from a _different_ set of 250 people than the original training data (albeit still a group split between Census Bureau employees and high school students). This helps give us confidence that our system can recognize digits from people whose writing it didn't see during training.

We'll use the notation @x@ to denote a training input. It'll be convenient to regard each training input @x@ as a @28 x 28 = 784@-dimensional vector. Each entry in the vector represents the grey value for a single pixel in the image. We'll denote the corresponding desired output by @y = y(x)@, where @y@ is a @10@-dimensional vector. For example, if a particular training image, @x@, depicts a @6@, then @y(x) = (0, 0, 0, 0, 0, 0, 1, 0, 0, 0)^T@ is the desired output from the network. Note that @T@ here is the transpose operation, turning a row vector into an ordinary (column) vector.

What we'd like is an algorithm which lets us find weights and biases so that the output from the network approximates @y(x)@ for all training inputs @x@. To quantify how well we're achieving this goal we define a _cost function_* <span class="marginnote">*Sometimes referred to as a _loss_ or _objective_ function. We use the term cost function throughout this book, but you should note the other terminology, since it's often used in research papers and other discussions of neural networks.</span> :

<a class="displaced_anchor" name="eqtn6"></a>

% C(w,b) == 1/2n sum_x|y(x)-a|^2             (6)%

Here, @w@ denotes the collection of all weights in the network, @b@ all the biases, @n@ is the total number of training inputs, @a@ is the vector of outputs from the network when @x@ is input, and the sum is over all training inputs, @x@. Of course, the output @a@ depends on @x@, @w@ and @b@, but to keep the notation simple I haven't explicitly indicated this dependence. The notation @|| v ||@ just denotes the usual length function for a vector @v@. We'll call @C@ the _quadratic_ cost function; it's also sometimes known as the _mean squared error_ or just _MSE_. Inspecting the form of the quadratic cost function, we see that @C(w,b)@ is non-negative, since every term in the sum is non-negative. Furthermore, the cost @C(w,b)@ becomes small, i.e., @C(w,b) ≈ 0@, precisely when @y(x)@ is approximately equal to the output, @a@, for all training inputs, @x@. So our training algorithm has done a good job if it can find weights and biases so that @C(w,b) ≈ 0@. By contrast, it's not doing so well when @C(w,b)@ is large - that would mean that @y(x)@ is not close to the output @a@ for a large number of inputs. So the aim of our training algorithm will be to minimize the cost @C(w,b)@ as a function of the weights and biases. In other words, we want to find a set of weights and biases which make the cost as small as possible. We'll do that using an algorithm known as _gradient descent_.

Why introduce the quadratic cost? After all, aren't we primarily interested in the number of images correctly classified by the network? Why not try to maximize that number directly, rather than minimizing a proxy measure like the quadratic cost? The problem with that is that the number of images correctly classified is not a smooth function of the weights and biases in the network. For the most part, making small changes to the weights and biases won't cause any change at all in the number of training images classified correctly. That makes it difficult to figure out how to change the weights and biases to get improved performance. If we instead use a smooth cost function like the quadratic cost it turns out to be easy to figure out how to make small changes in the weights and biases so as to get an improvement in the cost. That's why we focus first on minimizing the quadratic cost, and only after that will we examine the classification accuracy.

Even given that we want to use a smooth cost function, you may still wonder why we choose the quadratic function used in Equation <span id="margin_432054929623_reveal" class="equation_link">(6)</span><span id="margin_432054929623" class="marginequation" style="display: none;">[\begin{eqnarray} C(w,b) \equiv \frac{1}{2n} \sum_x || y(x) - a||^2 \nonumber\end{eqnarray}](#eqtn6)</span> Isn't this a rather _ad hoc_ choice? Perhaps if we chose a different cost function we'd get a totally different set of minimizing weights and biases? This is a valid concern, and later we'll revisit the cost function, and make some modifications. However, the quadratic cost function of Equation <span id="margin_488284336334_reveal" class="equation_link">(6)</span><span id="margin_488284336334" class="marginequation" style="display: none;">[\begin{eqnarray} C(w,b) \equiv \frac{1}{2n} \sum_x || y(x) - a||^2 \nonumber\end{eqnarray}](#eqtn6)</span> works perfectly well for understanding the basics of learning in neural networks, so we'll stick with it for now.

Recapping, our goal in training a neural network is to find weights and biases which minimize the quadratic cost function @C(w, b)@. This is a well-posed problem, but it's got a lot of distracting structure as currently posed - the interpretation of @w@ and @b@ as weights and biases, the @sigma@ function lurking in the background, the choice of network architecture, MNIST, and so on. It turns out that we can understand a tremendous amount by ignoring most of that structure, and just concentrating on the minimization aspect. So for now we're going to forget all about the specific form of the cost function, the connection to neural networks, and so on. Instead, we're going to imagine that we've simply been given a function of many variables and we want to minimize that function. We're going to develop a technique called _gradient descent_ which can be used to solve such minimization problems. Then we'll come back to the specific function we want to minimize for neural networks.

Okay, let's suppose we're trying to minimize some function, @C(v)@. This could be any real-valued function of many variables, @v = v_1, v_2, ...@. Note that I've replaced the @w@ and @b@ notation by @v@ to emphasize that this could be any function - we're not specifically thinking in the neural networks context any more. To minimize @C(v)@ it helps to imagine @C@ as a function of just two variables, which we'll call @v_1@ and @v_2@:

<center>

![](public/assets/images/valley.png)

</center>

What we'd like is to find where @C@ achieves its global minimum. Now, of course, for the function plotted above, we can eyeball the graph and find the minimum. In that sense, I've perhaps shown slightly _too_ simple a function! A general function, @C@, may be a complicated function of many variables, and it won't usually be possible to just eyeball the graph to find the minimum.

One way of attacking the problem is to use calculus to try to find the minimum analytically. We could compute derivatives and then try using them to find places where @C@ is an extremum. With some luck that might work when @C@ is a function of just one or a few variables. But it'll turn into a nightmare when we have many more variables. And for neural networks we'll often want _far_ more variables - the biggest neural networks have cost functions which depend on billions of weights and biases in an extremely complicated way. Using calculus to minimize that just won't work!

(After asserting that we'll gain insight by imagining @C@ as a function of just two variables, I've turned around twice in two paragraphs and said, "hey, but what if it's a function of many more than two variables?" Sorry about that. Please believe me when I say that it really does help to imagine @C@ as a function of two variables. It just happens that sometimes that picture breaks down, and the last two paragraphs were dealing with such breakdowns. Good thinking about mathematics often involves juggling multiple intuitive pictures, learning when it's appropriate to use each picture, and when it's not.)

<a name="gradient_descent"></a>

Okay, so calculus doesn't work. Fortunately, there is a beautiful analogy which suggests an algorithm which works pretty well. We start by thinking of our function as a kind of a valley. If you squint just a little at the plot above, that shouldn't be too hard. And we imagine a ball rolling down the slope of the valley. Our everyday experience tells us that the ball will eventually roll to the bottom of the valley. Perhaps we can use this idea as a way to find a minimum for the function? We'd randomly choose a starting point for an (imaginary) ball, and then simulate the motion of the ball as it rolled down to the bottom of the valley. We could do this simulation simply by computing derivatives (and perhaps some second derivatives) of @C@ - those derivatives would tell us everything we need to know about the local "shape" of the valley, and therefore how our ball should roll.

Based on what I've just written, you might suppose that we'll be trying to write down Newton's equations of motion for the ball, considering the effects of friction and gravity, and so on. Actually, we're not going to take the ball-rolling analogy quite that seriously - we're devising an algorithm to minimize @C@, not developing an accurate simulation of the laws of physics! The ball's-eye view is meant to stimulate our imagination, not constrain our thinking. So rather than get into all the messy details of physics, let's simply ask ourselves: if we were declared God for a day, and could make up our own laws of physics, dictating to the ball how it should roll, what law or laws of motion could we pick that would make it so the ball always rolled to the bottom of the valley?

To make this question more precise, let's think about what happens when we move the ball a small amount @Delta v_1@ in the @v_1@ direction, and a small amount @Delta v_2@ in the @v_2@ direction. Calculus tells us that @C@ changes as follows:
<a class="displaced_anchor" name="eqtn7"></a>

%
Delta C ~~ (del C)/(del v_1) Delta v_1 + (del C)/(del v_2) Delta v_2.             (7)
%

We're going to find a way of choosing @Delta v_1@ and @Delta v_2@ so as to make @Delta C@ negative; i.e., we'll choose them so the ball is rolling down into the valley. To figure out how to make such a choice it helps to define @Delta v@ to be the vector of changes in @v@, @Delta v == (Delta v_1, Delta v_2)^T@, where @T@ is again the transpose operation, turning row vectors into column vectors. We'll also define the _gradient_ of @C@ to be the vector of partial derivatives, @((del C)/(del v_1) , (del C)/(del v_2))^T@. We denote the gradient vector by @grad C@, i.e.:
<a class="displaced_anchor" name="eqtn8"></a>
%
grad C == ( (del C)/(del v_1) , (del C)/(del v_2))^T                (8)
%

In a moment we'll rewrite the change @Delta C@ in terms of @Delta v@ and the gradient, @grad C@. Before getting to that, though, I want to clarify something that sometimes gets people hung up on the gradient. When meeting the @grad C@ notation for the first time, people sometimes wonder how they should think about the @grad@ symbol. What, exactly, does @grad@ mean? In fact, it's perfectly fine to think of @grad C@ as a single mathematical object - the vector defined above - which happens to be written using two symbols. In this point of view, @grad@ is just a piece of notational flag-waving, telling you "hey, @grad C@ is a gradient vector". There are more advanced points of view where @grad@ can be viewed as an independent mathematical entity in its own right (for example, as a differential operator), but we won't need such points of view.

With these definitions, the expression
<span id="margin_659965637148_reveal" class="equation_link">(7)</span>
<span id="margin_659965637148" class="marginequation" style="display: none;">
    [\begin{eqnarray} Delta C ~~ \frac{del C}{del v_1} Delta v_1 + \frac{del C}{del v_2} Delta v_2 \nonumber\end{eqnarray}](#eqtn7)
</span>
for @Delta C@ can be rewritten as
<a class="displaced_anchor" name="eqtn9"></a>
%Delta C ~~ grad C * Delta v       (9)%

This equation helps explain why @grad C@ is called the gradient vector: @grad C@ relates changes in @v@ to changes in @C@, just as we'd expect something called a gradient to do. But what's really exciting about the equation is that it lets us see how to choose @Delta v@ so as to make @Delta C@ negative. In particular, suppose we choose

<a class="displaced_anchor" name="eqtn10"></a>
%Delta v = - eta grad C,         (10)%

where @eta@ is a small, positive parameter (known as the _learning rate_). Then Equation

<span id="margin_859162866010_reveal" class="equation_link">(9)</span>
<span id="margin_859162866010" class="marginequation" style="display: none;">[\begin{eqnarray} Delta C ~~ grad C * Delta v \nonumber\end{eqnarray}](#eqtn9)</span>

tells us that @Delta C ~~ -eta grad C * grad C = -eta ||grad C||^2@. Because @|| grad C ||^2 <= 0@, this guarantees that @Delta C >= 0@, i.e., @C@ will always decrease, never increase, if we change @v@ according to the prescription in

<span id="margin_116668158518_reveal" class="equation_link">(10)
</span><span id="margin_116668158518" class="marginequation" style="display: none;">[\begin{eqnarray} Delta v = -eta grad C \nonumber\end{eqnarray}](#eqtn10)</span>

(Within, of course, the limits of the approximation in Equation

<span id="margin_780815505894_reveal" class="equation_link">(9)</span>
<span id="margin_780815505894" class="marginequation" style="display: none;">[\begin{eqnarray} Delta C ~~ grad C * Delta v \nonumber\end{eqnarray}](#eqtn9)</span> ).

This is exactly the property we wanted! And so we'll take Equation

<span id="margin_11850183887_reveal" class="equation_link">(10)</span>
<span id="margin_11850183887" class="marginequation" style="display: none;">[\begin{eqnarray} Delta v = -eta grad C \nonumber\end{eqnarray}](#eqtn10)</span>

to define the "law of motion" for the ball in our gradient descent algorithm. That is, we'll use Equation

<span id="margin_838405111504_reveal" class="equation_link">(10)</span>

<span id="margin_838405111504" class="marginequation" style="display: none;">[\begin{eqnarray} Delta v = -eta grad C \nonumber\end{eqnarray}](#eqtn10)</span>

to compute a value for @Delta v@, then move the ball's position @v@ by that amount:

<a class="displaced_anchor" name="eqtn11"></a>

% v rarr v' = v - eta grad C     (11)%

Then we'll use this update rule again, to make another move. If we keep doing this, over and over, we'll keep decreasing @C@ until - we hope - we reach a global minimum.

Summing up, the way the gradient descent algorithm works is to repeatedly compute the gradient @grad C@, and then to move in the _opposite_ direction, "falling down" the slope of the valley. We can visualize it like this:

<center>

![](public/assets/images/valley_with_ball.png)

</center>

Notice that with this rule gradient descent doesn't reproduce real physical motion. In real life a ball has momentum, and that momentum may allow it to roll across the slope, or even (momentarily) roll uphill. It's only after the effects of friction set in that the ball is guaranteed to roll down into the valley. By contrast, our rule for choosing @Delta v@ just says "go down, right now". That's still a pretty good rule for finding the minimum!

To make gradient descent work correctly, we need to choose the learning rate @eta@ to be small enough that Equation <span id="margin_261741104421_reveal" class="equation_link">(9)</span><span id="margin_261741104421" class="marginequation" style="display: none;">[\begin{eqnarray} Delta C ~~ grad C * Delta v \nonumber\end{eqnarray}](#eqtn9)</span> is a good approximation. If we don't, we might end up with @Delta C > 0@, which obviously would not be good! At the same time, we don't want @eta@ to be too small, since that will make the changes @Delta v@ tiny, and thus the gradient descent algorithm will work very slowly. In practical implementations, @eta@ is often varied so that Equation
<span id="margin_89917482490_reveal" class="equation_link">(9)</span>
<span id="margin_89917482490" class="marginequation" style="display: none;">[\begin{eqnarray} Delta C ~~ grad C * Delta v \nonumber\end{eqnarray}](#eqtn9)</span>
remains a good approximation, but the algorithm isn't too slow. We'll see later how this works.

I've explained gradient descent when @C@ is a function of just two variables. But, in fact, everything works just as well even when @C@ is a function of many more variables. Suppose in particular that @C@ is a function of @m@ variables, @v_1,...,v_m@. Then the change @Delta C@ in @C@ produced by a small change @Delta v = (Delta v_1, ..., Delta v_m)^T@ is

<a class="displaced_anchor" name="eqtn12"></a>
%Delta C ~~ grad C * Delta v             (12)%
where the gradient @grad C@ is the vector
<a class="displaced_anchor" name="eqtn13"></a>
%grad C == ((del C)/(del v_1) ,..., (del C)/(del v_m))^T             (13)%

Just as for the two variable case, we can choose

<a class="displaced_anchor" name="eqtn14"></a>
%Delta v = -eta grad C,           (14)%

and we're guaranteed that our (approximate) expression
<span id="margin_737008049048_reveal" class="equation_link">(12)</span>
<span id="margin_737008049048" class="marginequation" style="display: none;">[\begin{eqnarray} Delta C ~~ grad C * Delta v \nonumber\end{eqnarray}](#eqtn12)</span>
for @Delta C@ will be negative. This gives us a way of following the gradient to a minimum, even when @C@ is a function of many variables, by repeatedly applying the update rule
<a class="displaced_anchor" name="eqtn15"></a>
%v rarr v' = v - eta grad C.          (15)%

You can think of this update rule as _defining_ the gradient descent algorithm. It gives us a way of repeatedly changing the position @v@ in order to find a minimum of the function @C@. The rule doesn't always work - several things can go wrong and prevent gradient descent from finding the global minimum of @C@, a point we'll return to explore in later chapters. But, in practice gradient descent often works extremely well, and in neural networks we'll find that it's a powerful way of minimizing the cost function, and so helping the net learn.

Indeed, there's even a sense in which gradient descent is the optimal strategy for searching for a minimum. Let's suppose that we're trying to make a move @Delta v@ in position so as to decrease @C@ as much as possible. This is equivalent to minimizing @Delta C ~~ grad C * Delta v@. We'll constrain the size of the move so that @|| Delta v || = epsilon@ for some small fixed @epsilon > 0@. In other words, we want a move that is a small step of a fixed size, and we're trying to find the movement direction which decreases @C@ as much as possible. It can be proved that the choice of @Delta v@ which minimizes @grad C * Delta v@ is @Delta v = - eta grad C@, where @eta = epsilon /(||grad C||)@ is determined by the size constraint @||Delta v|| = epsilon@. So gradient descent can be viewed as a way of taking small steps in the direction which does the most to immediately decrease @C@.

#### <a name="exercises_647181"></a>[Exercises](#exercises_647181)

*   Prove the assertion of the last paragraph. _Hint:_ If you're not already familiar with the [Cauchy-Schwarz inequality](http://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality), you may find it helpful to familiarize yourself with it.
*   I explained gradient descent when @C@ is a function of two variables, and when it's a function of more than two variables. What happens when @C@ is a function of just one variable? Can you provide a geometric interpretation of what gradient descent is doing in the one-dimensional case?

People have investigated many variations of gradient descent, including variations that more closely mimic a real physical ball. These ball-mimicking variations have some advantages, but also have a major disadvantage: it turns out to be necessary to compute second partial derivatives of @C@, and this can be quite costly. To see why it's costly, suppose we want to compute all the second partial derivatives @(del^2 C)/(del v_j del v_k)@. If there are a million such @v_j@ variables then we'd need to compute something like a trillion (i.e., a million squared) second partial derivatives* <span class="marginnote">*Actually, more like half a trillion, since @(del^2 C)/(del v_j del v_k) = (del^2 C)/(del v_k del v_j)@. Still, you get the point.</span>! That's going to be computationally costly. With that said, there are tricks for avoiding this kind of problem, and finding alternatives to gradient descent is an active area of investigation. But in this book we'll use gradient descent (and variations) as our main approach to learning in neural networks.

How can we apply gradient descent to learn in a neural network? The idea is to use gradient descent to find the weights @w_k@ and biases @b_l@ which minimize the cost in Equation <span id="margin_167805660230_reveal" class="equation_link">(6)</span><span id="margin_167805660230" class="marginequation" style="display: none;">%C(w,b)==1/2n sum_x||y(x)-a||^2%(#eqtn6)</span>. To see how this works, let's restate the gradient descent update rule, with the weights and biases replacing the variables @v_j@. In other words, our "position" now has components @w_k@ and @b_l@, and the gradient vector @grad C@ has corresponding components @(del C)/(del w_k)@ and @(del C)/(del b_l)@. Writing out the gradient descent update rule in terms of components, we have
<a class="displaced_anchor" name="eqtn16"></a>
<a class="displaced_anchor" name="eqtn17"></a>
%w_k rarr w'_k = w_k - eta (del C)/(del w_k)        (16)%
%b_l rarr b'_l = b_l - eta (del C)/(del b_l)       (17)%

By repeatedly applying this update rule we can "roll down the hill", and hopefully find a minimum of the cost function. In other words, this is a rule which can be used to learn in a neural network.

There are a number of challenges in applying the gradient descent rule. We'll look into those in depth in later chapters. But for now I just want to mention one problem. To understand what the problem is, let's look back at the quadratic cost in Equation <span id="margin_786090300230_reveal" class="equation_link">(6)</span><span id="margin_786090300230" class="marginequation" style="display: none;">%C(w,b)==1/2n sum_x||y(x)-a||^2%(#eqtn6)</span> . Notice that this cost function has the form @C= 1/n sum_x C_x@ , that is, it's an average over costs @C_x == ||y(x)-a||^2/2@ for individual training examples. In practice, to compute the gradient @grad C@ we need to compute the gradients @grad C_x@ separately for each training input, @x@, and then average them, @grad C = 1/n sum_x grad C_x@. Unfortunately, when the number of training inputs is very large this can take a long time, and learning thus occurs slowly.

An idea called _stochastic gradient descent_ can be used to speed up learning. The idea is to estimate the gradient @grad C@ by computing @grad C_x@ for a small sample of randomly chosen training inputs. By averaging over this small sample it turns out that we can quickly get a good estimate of the true gradient @grad C@, and this helps speed up gradient descent, and thus learning.

To make these ideas more precise, stochastic gradient descent works by randomly picking out a small number @m@ of randomly chosen training inputs. We'll label those random training inputs @X_1, X_2, ..., X_m@, and refer to them as a _mini-batch_. Provided the sample size @m@ is large enough we expect that the average value of the @grad C_X_j@ will be roughly equal to the average over all @grad C_x@, that is,
<a class="displaced_anchor" name="eqtn18"></a>
%(sum_(j=1) ^m gradC_X_j)/m ~~ (sum_x grad C_x)/n = grad C,             (18)%
where the second sum is over the entire set of training data. Swapping sides we get
<a class="displaced_anchor" name="eqtn19"></a>
%grad C ~~ 1/m sum_(j=1)^m grad C_X_j,                  (19)%
confirming that we can estimate the overall gradient by computing gradients just for the randomly chosen mini-batch.

To connect this explicitly to learning in neural networks, suppose @w_k@ and @b_l@ denote the weights and biases in our neural network. Then stochastic gradient descent works by picking out a randomly chosen mini-batch of training inputs, and training with those,
<a class="displaced_anchor" name="eqtn20"></a><a class="displaced_anchor" name="eqtn21"></a>
%w_k rarr w'_k = w_k - eta/m sum_j(delC_X_j)/(del W_k)               (20)%
%b_l rarr b'_l = bl - eta/m sum_j (delC_X_j)/(del b_j)                (21)%

where the sums are over all the training examples @X_j@ in the current mini-batch. Then we pick out another randomly chosen mini-batch and train with those. And so on, until we've exhausted the training inputs, which is said to complete an _epoch_ of training. At that point we start over with a new training epoch.

Incidentally, it's worth noting that conventions vary about scaling of the cost function and of mini-batch updates to the weights and biases. In Equation <span id="margin_84852336525_reveal" class="equation_link">(6)</span><span id="margin_84852336525" class="marginequation" style="display: none;">%C(w,b)==1/2n sum_x||y(x)-a||^2%(#eqtn6)</span> we scaled the overall cost function by a factor @1/n@. People sometimes omit the @1/n@, summing over the costs of individual training examples instead of averaging. This is particularly useful when the total number of training examples isn't known in advance. This can occur if more training data is being generated in real time, for instance. And, in a similar way, the mini-batch update rules <span id="margin_517690364363_reveal" class="equation_link">(20)</span><span id="margin_517690364363" class="marginequation" style="display: none;">%w_k rarr w'_k = w_k - eta/m sum_j(delC_X_j)/(del W_k)%(#eqtn20)</span> and <span id="margin_863737688414_reveal" class="equation_link">(21)</span><span id="margin_863737688414" class="marginequation" style="display: none;">%b_l rarr b'_l = bl - eta/m sum_j (delC_X_j)/(del b_j)%(#eqtn21)</span> sometimes omit the @1/m@ term out the front of the sums. Conceptually this makes little difference, since it's equivalent to rescaling the learning rate @eta@. But when doing detailed comparisons of different work it's worth watching out for.

We can think of stochastic gradient descent as being like political polling: it's much easier to sample a small mini-batch than it is to apply gradient descent to the full batch, just as carrying out a poll is easier than running a full election. For example, if we have a training set of size @n = 60,000@, as in MNIST, and choose a mini-batch size of (say) @m = 10@, this means we'll get a factor of @6,000@ speedup in estimating the gradient! Of course, the estimate won't be perfect - there will be statistical fluctuations - but it doesn't need to be perfect: all we really care about is moving in a general direction that will help decrease @C@, and that means we don't need an exact computation of the gradient. In practice, stochastic gradient descent is a commonly used and powerful technique for learning in neural networks, and it's the basis for most of the learning techniques we'll develop in this book.

#### <a name="exercise_263792"></a>[Exercise](#exercise_263792)

*   An extreme version of gradient descent is to use a mini-batch size of just 1\. That is, given a training input, @x@, we update our weights and biases according to the rules @w_k rarr w'_k = w_k - eta (del C_x)/(del W_L)@ and @b_l rarr b'_l = b_l - eta(del C_x)/(del b_l)@. Then we choose another training input, and update the weights and biases again. And so on, repeatedly. This procedure is known as _online_, _on-line_, or _incremental_ learning. In online learning, a neural network learns from just one training input at a time (just as human beings do). Name one advantage and one disadvantage of online learning, compared to stochastic gradient descent with a mini-batch size of, say, @20@.

Let me conclude this section by discussing a point that sometimes bugs people new to gradient descent. In neural networks the cost @C@ is, of course, a function of many variables - all the weights and biases - and so in some sense defines a surface in a very high-dimensional space. Some people get hung up thinking: "Hey, I have to be able to visualize all these extra dimensions". And they may start to worry: "I can't think in four dimensions, let alone five (or five million)". Is there some special ability they're missing, some ability that "real" supermathematicians have? Of course, the answer is no. Even most professional mathematicians can't visualize four dimensions especially well, if at all. The trick they use, instead, is to develop other ways of representing what's going on. That's exactly what we did above: we used an algebraic (rather than visual) representation of @Delta C@ to figure out how to move so as to decrease @C@. People who are good at thinking in high dimensions have a mental library containing many different techniques along these lines; our algebraic trick is just one example. Those techniques may not have the simplicity we're accustomed to when visualizing three dimensions, but once you build up a library of such techniques, you can get pretty good at thinking in high dimensions. I won't go into more detail here, but if you're interested then you may enjoy reading [this discussion](http://mathoverflow.net/questions/25983/intuitive-crutches-for-higher-dimensional-thinking) of some of the techniques professional mathematicians use to think in high dimensions. While some of the techniques discussed are quite complex, much of the best content is intuitive and accessible, and could be mastered by anyone.

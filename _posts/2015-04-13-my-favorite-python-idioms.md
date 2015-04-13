---
layout: post
tags: python idioms
---

# My Favorite Python Idioms

Python is a sexy language, and in my opinion, the *sexiest*. Alot of this sexyness comes from a handful of idioms
that make your code shorter without the fogging up your intention. 

### List Comprehensions

Creating a new list from an existing one? With transformations? With filters? List comprehensions will help here:

{% highlight python %}
original = [1,2,3,4,5,]
doubled = [i * 2 for i in original]
{% endhighlight %}

`doubled` now contains `[2,4,6,8,10]`.

{% highlight python %}
matrix_w, matrix_h = 10, 10
matrix = [[0.0 for row in range(matrix_w)] for column in range(matrix_h)]
{% endhighlight %}

`matrix` contains a 2-d list, aka a list of lists, with each cell (10x10) set to `0.0`.

{% highlight python %}
even_numbers_0_to_100 = [i for i in range(101) if i % 2 == 2]
{% endhighlight %}

Like you probably guessed, even_numbers_0_to_100 is a list of all even numbers from `0` to `100`: `[0,2,4,6,...100]`.

### Dict Comprehensions

Very similar to the list comprehensions, dict comprehensions allow you to create dicts.

{% highlight python %}
ascii_codes = {chr(k): k for k in range(97, 123)}
{% endhighlight %}

This created a dict where the keys are `'a'` to `'z'` and the values are the corresponding ascii codes (eg `'a' => 97`, `'b' => 98`, ..).

### Tuple matching

A function in python may return multiple values. Assigning those values to multiple variables is easy:

{% highlight python %}
def my_function(v):
    return v * 2, v * 3

doubled, tripled = my_function(5)
{% endhighlight %}

Running the above results in `doubled = 10` and `tripled = 15`. It's no where close to as powerful as the matching done in `erlang` but
it's a lot nicer than the PHP version where you must "pack and unpack" the values into a list:

{% highlight python %}
function my_function($v) {
    return [ $v * 2, $v * 3 ];
}
list($doubled, $tripled) = my_function(5);
{% endhighlight %}

This becomes pretty useful your application is modeled with `ERROR CODES` (although, arguably you should be using `Exceptions`) and functions
return the result and an error code:

{% highlight python %}
def my_function(v):
    if v % 2 == 1:
        return 1, None

    return 0, v / 2

error, result = my_function(5)
if error:
    pass # ...
{% endhighlight %}

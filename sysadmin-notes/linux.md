---
layout: post
---


# A peek into the toolbox we call GNU/Linux

### Linux and files

One of the best (and potentially alien) things about linux is it's use of files. In linux *everything*
is a file. Your ethernet card is seen as a file, your directories are just files, your bluetooth
keyboard is a file, and even the connection of your browser to this very web page is a file, 
and of course your files are files. 

By that I mean that everything can be maniputated as if it were a file (open/read/write/close) and 
that you will find an entry point for it somewhere under your root mount point `/`.

### Bash meta variables

{% highlight bash %}
mkdir /tmp/XXX && cd $_; # $_ is contains the last argument of the previous command (eg "/tmp/XXX")
{% endhighlight %}

Unix commands typically follow the convention that a `0` return code means success and anything
else is an error. This is opposite to what you might expect comming from dynamic language programming
where a `0` is often seen as falsy and any other any as truthy.

{% highlight bash %}
if ! mkdir /tmp/XXX; then
    # an error has occured
    # the return value (single byte) of the previous command is stored in `$?`
    local error_code="$?";
    case $error_code in
        "1")
            # network error
            :
        ;;
        "2")
            # permission error
            :
        ;;
    esac
fi
{% endhighlight %}

A second note about the above is the use of single colons as a `NOP expression`. In the `case/esac`
each `case` requires an expression, otherwise you'll get a parse error. This is equivalent to the
`pass` expression in python.

### The power of pipes

In your linux toolbox you'll find a large selection of small simple tools. Alone, each of these tools
may seem useless at first, but the real power comes from the power of piping these tools together to
create `streaming pipelines`.

Let's use `grep`, `awk`, and `cut` to strip out the IPv4 address from `ifconfig` output.

{% highlight bash %}
ifconfig wlan0 | grep 'inet addr' | awk '{print $2}' | cut -d: -f1
{% endhighlight %}

### Other notes

Using the bash glob operator, `*`, isn't always going to work for large inputs (for example `ls -lah /tmp/*.txt) if there are thousands of .txt files. Instead use `find`:

{% highlight bash %}
find /tmp/ -type f -name '*txt'
{% endhighlight %}

`find` is a lot more powerful than you might think, it can also pass each of the matched file paths to 
another command for further processing:

{% highlight bash %}
find /tmp/ -type f -name '*txt' -exec cat {} \;
{% endhighlight %}

The `{}` are placeholders of that will using string interpolation to be replaced with the matched file names.

Final example, cat all the JS files into a single minified 'app.js':

{% highlight bash %}
# a naive method
find /var/www/site.com/js/ -type f -name '*js' -exec cat {} \; > /var/www/site.com/app.js

# add a compression/minifier and md5 checksum to the pipeline:
find /var/www/site.com/js/ -type f -name '*js' -exec cat {} \; \
    | minifier \
    | tee /var/www/site.com/js/app.js \
    | md5sum > /var/www/site.com/js/app.js.md5;
{% endhighlight %}

As seen above, `tee` is another very useful command for *duplicating* a stream. It gets one input stream and outputs
two: one to a file (the string parameter), the second to `stdout` which allows so you may add other pipeline steps.

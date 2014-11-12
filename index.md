---
title: this is my title
layout: post
---

Some catchy title
#################

{% highlight bash %}

for i in $(seq 1 10); do
  local server_name="web-${i}.example.com"
  ssh $server_name
done

{% endhighlight %}

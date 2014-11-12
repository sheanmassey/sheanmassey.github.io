---
title: this is my title
layout: post
---

deded
=====

{% highlight bash %}

for i in $(seq 1 10); do
  local server_name="web-${i}.example.com"
  ssh $server_name
done

{% endhighlight %}

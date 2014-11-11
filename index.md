---
title: this is my title
layout: post
---

Deal w/ it.


{% hightlight bash %}

for i in $(seq 1 10); do
  local server_name="web-${i}.example.com"
  ssh $server_name
done

{% endhighlight %}

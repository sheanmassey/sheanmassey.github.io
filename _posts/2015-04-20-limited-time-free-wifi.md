---
layout: post
---

I'm sitting in a hotel lobby in London writing this blog post with my *second* "first 30 minutes of wifi are free" :)
I'll admit that 3 GBP for 24 hours wifi wasn't in fact too abusive but... I hate paying for things I could get for free.
So after a couple quick tests (I have 2 devices, a laptop and a wifi enabled cell phone) I realized these facts:

- the information that's input on the subscription form for the 30minutes free wifi isn't verified.. not even a "confirm by email" (totally makes sense, how would you get the email if you don't have internet access? Maybe they should do a first 30mintes free and a second 30 free IF and only if you verified your email address by clicking on a link from an automated email sent to the first address?)
- I was able to get a second free session by simply connecting with my cell phone, the first session I used up with the laptop
- clearing cookies / caches / private mode browsing changed nothing when done from my laptop, the platform informed me each time that I had (rightfully so) already used up the free session

Using these facts I realized the auth check obviously wasn't cookie based.. but what sort of unique identifier could they be using to determine that I had already used my session?
The first thing to pop into my mind was correct: MAC Addresses.

So tadaa, new MAC address, completely made up "username, password, and email address" == free wifi for evar!!1!

{% highlight bash %}
sudo ifconfig wlan0 down hw ether 00:00:00:00:00:01
sudo ifconfig wlan0 up
{% endhighlight %}

`Security by obscurity` comes to mind... =)

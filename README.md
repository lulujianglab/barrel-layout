# 图片木桶布局

使用JavaScript、CSS实现木桶布局：

    一些摄影网站上多功能相册的布局方式。每张图片的占位长宽比和图片本身的长宽比是一致的；每一行的高度是不固定的，但是要尽可能接近；每行的图片数也是不同的，在一定范围内（每行 3-6 张，最后一行除外）通过控制图片是否加入当前行，保证行高尽可能接近。

### JS获取IMG图片宽高： 

  [参考链接](http://www.cnblogs.com/koukouyifan/p/4066564.html)

    1. obj.style.width(height) 这个方法，只有在标签里用style属性写进了width的大小，才可以获取到值，否则只返回的为空。

    2. obj.offsetWidth(offsetHeight) width值+padding值+border值

    3. obj.clientWidth(clientHeight) width值+padding值
  
    注：上述两种方法要想获取到img标签的宽，是在img标签里添加的style=”width: px” 。如果去掉这一属性值，那么返回的值就是图片本身的高宽值。
  
    4. getComputedStyle 与 currentStyle是处理兼容性的两个方法，获取到的值都是图片在屏幕上显示的仅仅图片的高宽值，不会获取到img标签的padding及border值；但其中getComputedStyle适用于Firefox/IE9/Safari/Chrome/Opera浏览器，currentStyle适用于IE6/7/8。但是如果img标签即使没有设置style属性也没有引入样式表，那么只有getComputedStyle能获取到值，即为图片本身高宽值，currentStyle则返回auto。
  
  5. obj.naturalWidth(naturalHeight)方法，这是HTML5里新添加的一个获取元素高宽的方法，但只适用于Firefox/IE9/Safari/Chrome/Opera浏览器。
  
[JS快速获取图片宽高的方法](http://www.css88.com/archives/5224/comment-page-1)

querySelector()和querySelectorAll()两个DOM选择器，像CSS选择器一样选择需要的节点。
 [参考链接](http://www.nowamagic.net/librarys/veda/detail/388)
  
## 主要思路：

    1. 先设置整行的宽（document.getElementById(' ').style.width = document.documentElement.clientWidth - 30 + 'px'）
    
    2. 然后获取照片并且把原宽高，宽高比，链接都存到图片数组imgs中，按照预设的高300和原宽高比ratio算出缩放后的宽；
    
    3. 然后遍历图片并累加图片宽度，累加和大于整行的宽时就创建一个新的div来存储照片；
    
    4. 随后把储存照片的div的高按比例设置就能等宽了。
    
    每张照片宽改成：预设的行高*(原宽/原高)。
    
    根据改完后的宽来计算一行最少要多宽，假设第一行图片总宽度为1400；
    
    这时就需要设置高度来让宽变成浏览器界面的宽，例如浏览器界面的宽1333。则所需行高 = 预设行高*(1333/1400)
    

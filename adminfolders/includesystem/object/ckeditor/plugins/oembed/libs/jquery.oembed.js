﻿(function(b){function k(){var a=window.location.protocol;return"file:"===a?"http://":a+"//"}function n(a,b){b=b?b:"";return a?n(--a,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(60*Math.random()))+b):b}function o(a,b){var c=a.apiendpoint,e="",h,c=c+(0>=c.indexOf("?")?"?":"&"),c=c.replace("#","%23");if(null!==a.maxWidth&&("undefined"===typeof a.params.maxwidth||null===a.params.maxwidth))a.params.maxwidth=a.maxWidth;if(null!==a.maxHeight&&("undefined"===typeof a.params.maxheight||
null===a.params.maxheight))a.params.maxheight=a.maxHeight;for(h in a.params)h!=a.callbackparameter&&null!==a.params[h]&&(e+="&"+escape(h)+"="+a.params[h]);c+="format="+a.format+"&url="+escape(b)+e;"json"!=a.dataType&&(c+="&"+a.callbackparameter+"=?");return c}function m(a,l,c){b("#jqoembeddata").data(l,a.code);j.beforeEmbed.call(c,a);j.onEmbed.call(c,a);j.afterEmbed.call(c,a)}function e(a,l,c){if(void 0!=b("#jqoembeddata").data(l)&&"iframe"!=c.embedtag.tag){var e={code:b("#jqoembeddata").data(l)};
m(e,l,a)}else if(c.yql){var e=c.yql.from||"htmlstring",h=c.yql.url?c.yql.url(l):l,f="SELECT * FROM "+e+' WHERE url="'+h+'" and '+(/html/.test(e)?"xpath":"itemPath")+"='"+(c.yql.xpath||"/")+"'";"html"==e&&(f+=" and compat='html5'");e=b.extend({url:k()+"query.yahooapis.com/v1/public/yql",dataType:"jsonp",data:{q:f,format:"json",env:"store://datatables.org/alltableswithkeys",callback:"?"},success:function(d){if(c.yql.xpath&&"//meta|//title|//link"==c.yql.xpath){var e={};null==d.query.results&&(d.query.results=
{meta:[]});for(var f=0,g=d.query.results.meta.length;f<g;f++){var j=d.query.results.meta[f].name||d.query.results.meta[f].property||null;null!=j&&(e[j.toLowerCase()]=d.query.results.meta[f].content)}if((!e.hasOwnProperty("title")||!e.hasOwnProperty("og:title"))&&null!=d.query.results.title)e.title=d.query.results.title;if(!e.hasOwnProperty("og:image")&&d.query.results.hasOwnProperty("link")){f=0;for(g=d.query.results.link.length;f<g;f++)d.query.results.link[f].hasOwnProperty("rel")&&"apple-touch-icon"==
d.query.results.link[f].rel&&(e["og:image"]="/"==d.query.results.link[f].href.charAt(0)?h.match(/^(([a-z]+:)?(\/\/)?[^\/]+\/).*$/)[1]+d.query.results.link[f].href:d.query.results.link[f].href)}d=c.yql.datareturn(e)}else d=c.yql.datareturn?c.yql.datareturn(d.query.results):d.query.results.result;!1!==d&&(e=b.extend({},d),e.code=d,m(e,l,a))},error:function(){j.onError.call(a,l,c)}},j.ajaxOptions||{});b.ajax(e)}else if(c.templateRegex)if(""!==c.embedtag.tag){var e=c.embedtag.flashvars||"",f=c.embedtag.tag||
"embed",d=c.embedtag.width||"auto",g=c.embedtag.height||"auto",p=l.replace(c.templateRegex,c.apiendpoint);c.nocache||(p+="&jqoemcache="+n(5));c.apikey&&(p=p.replace("_APIKEY_",j.apikeys[c.name]));if(j.maxHeight&&j.maxWidth)if(j.useResponsiveResize){var q=0,r=d,s=g;d>j.maxWidth&&(q=j.maxWidth/d,r=j.maxWidth,s=g*q,g*=q,d*=q);g>j.maxHeight&&(q=j.maxHeight/g,s=j.maxHeight,r=d*q,d*=q);g=s;d=r}else g=j.maxHeight,d=j.maxWidth;d=b("<"+f+"/>").attr("src",p).attr("width",d).attr("height",g).attr("allowfullscreen",
c.embedtag.allowfullscreen||"true").attr("allowscriptaccess",c.embedtag.allowfullscreen||"always").css("max-height",j.maxHeight||"auto").css("max-width",j.maxWidth||"auto");"embed"==f&&d.attr("type",c.embedtag.type||"application/x-shockwave-flash").attr("flashvars",l.replace(c.templateRegex,e));"iframe"==f&&d.attr("scrolling",c.embedtag.scrolling||"no").attr("frameborder",c.embedtag.frameborder||"0");e={code:d};m(e,l,a)}else c.apiendpoint?(c.apikey&&(c.apiendpoint=c.apiendpoint.replace("_APIKEY_",
j.apikeys[c.name])),e=b.extend({url:l.replace(c.templateRegex,c.apiendpoint),dataType:"jsonp",success:function(d){var e=b.extend({},d);e.code=c.templateData(d);m(e,l,a)},error:function(){j.onError.call(a,l,c)}},j.ajaxOptions||{}),b.ajax(e)):(e={code:l.replace(c.templateRegex,c.template)},m(e,l,a));else e=o(c,l),e=b.extend({url:e,dataType:c.dataType||"jsonp",success:function(c){c=b.extend({},c);switch(c.type){case "file":case "photo":c.code=b.fn.oembed.getPhotoCode(l,c);break;case "video":case "rich":c.code=
b.fn.oembed.getRichCode(l,c);break;default:c.code=b.fn.oembed.getGenericCode(l,c)}m(c,l,a)},error:function(){j.onError.call(a,l,c)}},j.ajaxOptions||{}),b.ajax(e)}function p(a){if(null===a)return null;var b,c={};for(b in a)null!==b&&(c[b.toLowerCase()]=a[b]);return c}b.fn.oembed=function(a,l,c){j=b.extend(!0,b.fn.oembed.defaults,l);var k="0rz.tw 1link.in 1url.com 2.gp 2big.at 2tu.us 3.ly 307.to 4ms.me 4sq.com 4url.cc 6url.com 7.ly a.gg a.nf aa.cx abcurl.net ad.vu adf.ly adjix.com afx.cc all.fuseurl.com alturl.com amzn.to ar.gy arst.ch atu.ca azc.cc b23.ru b2l.me bacn.me bcool.bz binged.it bit.ly bizj.us bloat.me bravo.ly bsa.ly budurl.com canurl.com chilp.it chzb.gr cl.lk cl.ly clck.ru cli.gs cliccami.info clickthru.ca clop.in conta.cc cort.as cot.ag crks.me ctvr.us cutt.us dai.ly decenturl.com dfl8.me digbig.com http://digg.com/[^/]+$ disq.us dld.bz dlvr.it do.my doiop.com dopen.us easyuri.com easyurl.net eepurl.com eweri.com fa.by fav.me fb.me fbshare.me ff.im fff.to fire.to firsturl.de firsturl.net flic.kr flq.us fly2.ws fon.gs freak.to fuseurl.com fuzzy.to fwd4.me fwib.net g.ro.lt gizmo.do gl.am go.9nl.com go.ign.com go.usa.gov goo.gl goshrink.com gurl.es hex.io hiderefer.com hmm.ph href.in hsblinks.com htxt.it huff.to hulu.com hurl.me hurl.ws icanhaz.com idek.net ilix.in is.gd its.my ix.lt j.mp jijr.com kl.am klck.me korta.nu krunchd.com l9k.net lat.ms liip.to liltext.com linkbee.com linkbun.ch liurl.cn ln-s.net ln-s.ru lnk.gd lnk.ms lnkd.in lnkurl.com lru.jp lt.tl lurl.no macte.ch mash.to merky.de migre.me miniurl.com minurl.fr mke.me moby.to moourl.com mrte.ch myloc.me myurl.in n.pr nbc.co nblo.gs nn.nf not.my notlong.com nsfw.in nutshellurl.com nxy.in nyti.ms o-x.fr oc1.us om.ly omf.gd omoikane.net on.cnn.com on.mktw.net onforb.es orz.se ow.ly ping.fm pli.gs pnt.me politi.co post.ly pp.gg profile.to ptiturl.com pub.vitrue.com qlnk.net qte.me qu.tc qy.fi r.ebay.com r.im rb6.me read.bi readthis.ca reallytinyurl.com redir.ec redirects.ca redirx.com retwt.me ri.ms rickroll.it riz.gd rt.nu ru.ly rubyurl.com rurl.org rww.tw s4c.in s7y.us safe.mn sameurl.com sdut.us shar.es shink.de shorl.com short.ie short.to shortlinks.co.uk shorturl.com shout.to show.my shrinkify.com shrinkr.com shrt.fr shrt.st shrten.com shrunkin.com simurl.com slate.me smallr.com smsh.me smurl.name sn.im snipr.com snipurl.com snurl.com sp2.ro spedr.com srnk.net srs.li starturl.com stks.co su.pr surl.co.uk surl.hu t.cn t.co t.lh.com ta.gd tbd.ly tcrn.ch tgr.me tgr.ph tighturl.com tiniuri.com tiny.cc tiny.ly tiny.pl tinylink.in tinyuri.ca tinyurl.com tk. tl.gd tmi.me tnij.org tnw.to tny.com to.ly togoto.us totc.us toysr.us tpm.ly tr.im tra.kz trunc.it twhub.com twirl.at twitclicks.com twitterurl.net twitterurl.org twiturl.de twurl.cc twurl.nl u.mavrev.com u.nu u76.org ub0.cc ulu.lu updating.me ur1.ca url.az url.co.uk url.ie url360.me url4.eu urlborg.com urlbrief.com urlcover.com urlcut.com urlenco.de urli.nl urls.im urlshorteningservicefortwitter.com urlx.ie urlzen.com usat.ly use.my vb.ly vevo.ly vgn.am vl.am vm.lc w55.de wapo.st wapurl.co.uk wipi.es wp.me x.vu xr.com xrl.in xrl.us xurl.es xurl.jp y.ahoo.it yatuc.com ye.pe yep.it yfrog.com yhoo.it yiyd.com youtu.be yuarel.com z0p.de zi.ma zi.mu zipmyurl.com zud.me zurl.ws zz.gd zzang.kr ›.ws ✩.ws ✿.ws ❥.ws ➔.ws ➞.ws ➡.ws ➨.ws ➯.ws ➹.ws ➽.ws".split(" ");
0===b("#jqoembeddata").length&&b('<span id="jqoembeddata"></span>').appendTo("body");return this.each(function(){var l=b(this),f=a&&(!a.indexOf("http://")||!a.indexOf("https://"))?a:l.attr("href"),d;c?j.onEmbed=c:j.onEmbed||(j.onEmbed=function(a){b.fn.oembed.insertCode(this,j.embedMethod,a)});if(null!==f&&void 0!==f){for(var g=0,m=k.length;g<m;g++)if(null!==f.match(RegExp("://"+k[g]+"/","i")))return g=b.extend({url:"http://api.longurl.org/v2/expand",dataType:"jsonp",data:{url:f,format:"json"},success:function(a){f=
a["long-url"];d=b.fn.oembed.getOEmbedProvider(a["long-url"]);if(d!==null){d.params=p(j[d.name])||{};d.maxWidth=j.maxWidth;d.maxHeight=j.maxHeight;e(l,f,d)}else j.onProviderNotFound.call(l,f)}},j.ajaxOptions||{}),b.ajax(g),l;d=b.fn.oembed.getOEmbedProvider(f);null!==d?(d.params=p(j[d.name])||{},d.maxWidth=j.maxWidth,d.maxHeight=j.maxHeight,e(l,f,d)):j.onProviderNotFound.call(l,f)}return l})};var j;b.fn.oembed.defaults={maxWidth:null,maxHeight:null,useResponsiveResize:!1,includeHandle:!0,embedMethod:"auto",
onProviderNotFound:function(){},beforeEmbed:function(){},afterEmbed:function(){},onEmbed:!1,onError:function(){},ajaxOptions:{timeout:2E3}};b.fn.oembed.insertCode=function(a,e,c){if(null!==c)switch("auto"==e&&null!==a.attr("href")?e="append":"auto"==e&&(e="replace"),e){case "replace":a.replaceWith(c.code);break;case "fill":a.html(c.code);break;case "append":a.wrap('<div class="oembedall-container"></div>');e=a.parent();j.includeHandle&&b('<span class="oembedall-closehide">&darr;</span>').insertBefore(a).click(function(){var a=
encodeURIComponent(b(this).text());b(this).html("%E2%86%91"==a?"&darr;":"&uarr;");b(this).parent().children().last().toggle()});e.append("<br/>");try{c.code.clone().appendTo(e)}catch(k){e.append(c.code)}}};b.fn.oembed.getPhotoCode=function(a,b){var c;c=b.title?b.title:"";c+=b.author_name?" - "+b.author_name:"";c+=b.provider_name?" - "+b.provider_name:"";c='<div><a href="'+a+"\" target='_blank'><img src=\""+b.url+'" alt="'+c+'"/></a></div>';b.html&&(c+="<div>"+b.html+"</div>");return c};b.fn.oembed.getRichCode=
function(a,b){return b.html};b.fn.oembed.getGenericCode=function(a,b){var c='<a href="'+a+'">'+(null!==b.title?b.title:a)+"</a>";b.html&&(c+="<div>"+b.html+"</div>");return c};b.fn.oembed.getOEmbedProvider=function(a){for(var e=0;e<b.fn.oembed.providers.length;e++)for(var c=0,j=b.fn.oembed.providers[e].urlschemes.length;c<j;c++)if(null!==a.match(RegExp(b.fn.oembed.providers[e].urlschemes[c],"i")))return b.fn.oembed.providers[e];return null};b.fn.oembed.OEmbedProvider=function(a,b,c,e,h){this.name=
a;this.type=b;this.urlschemes=c;this.apiendpoint=e;this.maxWidth=500;this.maxHeight=400;h=h||{};h.useYQL&&(h.yql="xml"==h.useYQL?{xpath:"//oembed/html",from:"xml",apiendpoint:this.apiendpoint,url:function(a){return this.apiendpoint+"?format=xml&url="+a},datareturn:function(a){return a.html.replace(/.*\[CDATA\[(.*)\]\]>$/,"$1")||""}}:{from:"json",apiendpoint:this.apiendpoint,url:function(a){return this.apiendpoint+"?format=json&url="+a},datareturn:function(a){return"video"!=a.json.type&&(a.json.url||
a.json.thumbnail_url)?'<img src="'+(a.json.url||a.json.thumbnail_url)+'"  />':a.json.html||""}},this.apiendpoint=null);for(var f in h)this[f]=h[f];this.format=this.format||"json";this.callbackparameter=this.callbackparameter||"callback";this.embedtag=this.embedtag||{tag:""}};b.fn.oembed.providers=[new b.fn.oembed.OEmbedProvider("youtube","video",["youtube\\.com/watch.+v=[\\w-]+&?","youtu\\.be/[\\w-]+","youtube.com/embed"],k()+"www.youtube.com/embed/$1?wmode=transparent",{templateRegex:/.*(?:v\=|be\/|embed\/)([\w\-]+)&?.*/,
embedtag:{tag:"iframe",width:"425",height:"349"}}),new b.fn.oembed.OEmbedProvider("wistia","video",["wistia.com/m/.+","wistia.com/embed/.+","wi.st/m/.+","wi.st/embed/.+"],"http://fast.wistia.com/oembed",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("xtranormal","video",["xtranormal\\.com/watch/.+"],"http://www.xtranormal.com/xtraplayr/$1/$2",{templateRegex:/.*com\/watch\/([\w\-]+)\/([\w\-]+).*/,embedtag:{tag:"iframe",width:"320",height:"269"}}),new b.fn.oembed.OEmbedProvider("scivee","video",["scivee.tv/node/.+"],
"http://www.scivee.tv/flash/embedCast.swf?",{templateRegex:/.*tv\/node\/(.+)/,embedtag:{width:"480",height:"400",flashvars:"id=$1&type=3"}}),new b.fn.oembed.OEmbedProvider("veoh","video",["veoh.com/watch/.+"],"http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1337&permalinkId=$1&player=videodetailsembedded&videoAutoPlay=0&id=anonymous",{templateRegex:/.*watch\/([^\?]+).*/,embedtag:{width:"410",height:"341"}}),new b.fn.oembed.OEmbedProvider("gametrailers","video",["gametrailers\\.com/video/.+"],
"http://media.mtvnservices.com/mgid:moses:video:gametrailers.com:$2",{templateRegex:/.*com\/video\/([\w\-]+)\/([\w\-]+).*/,embedtag:{width:"512",height:"288"}}),new b.fn.oembed.OEmbedProvider("funnyordie","video",["funnyordie\\.com/videos/.+"],"http://player.ordienetworks.com/flash/fodplayer.swf?",{templateRegex:/.*videos\/([^\/]+)\/([^\/]+)?/,embedtag:{width:512,height:328,flashvars:"key=$1"}}),new b.fn.oembed.OEmbedProvider("colledgehumour","video",["collegehumor\\.com/video/.+"],"http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id=$1&use_node_id=true&fullscreen=1",
{templateRegex:/.*video\/([^\/]+).*/,embedtag:{width:600,height:338}}),new b.fn.oembed.OEmbedProvider("metacafe","video",["metacafe\\.com/watch/.+"],"http://www.metacafe.com/fplayer/$1/$2.swf",{templateRegex:/.*watch\/(\d+)\/(\w+)\/.*/,embedtag:{width:400,height:345}}),new b.fn.oembed.OEmbedProvider("bambuser","video",["bambuser\\.com/channel/.*/broadcast/.*"],"http://static.bambuser.com/r/player.swf?vid=$1",{templateRegex:/.*bambuser\.com\/channel\/.*\/broadcast\/(\w+).*/,embedtag:{width:512,height:339}}),
new b.fn.oembed.OEmbedProvider("twitvid","video",["twitvid\\.com/.+"],"http://www.twitvid.com/embed.php?guid=$1&autoplay=0",{templateRegex:/.*twitvid\.com\/(\w+).*/,embedtag:{tag:"iframe",width:480,height:360}}),new b.fn.oembed.OEmbedProvider("aniboom","video",["aniboom\\.com/animation-video/.+"],"http://api.aniboom.com/e/$1",{templateRegex:/.*animation-video\/(\d+).*/,embedtag:{width:594,height:334}}),new b.fn.oembed.OEmbedProvider("vzaar","video",["vzaar\\.com/videos/.+","vzaar.tv/.+"],"http://view.vzaar.com/$1/player?",
{templateRegex:/.*\/(\d+).*/,embedtag:{tag:"iframe",width:576,height:324}}),new b.fn.oembed.OEmbedProvider("snotr","video",["snotr\\.com/video/.+"],"http://www.snotr.com/embed/$1",{templateRegex:/.*\/(\d+).*/,embedtag:{tag:"iframe",width:400,height:330,nocache:1}}),new b.fn.oembed.OEmbedProvider("youku","video",["v.youku.com/v_show/id_.+"],"http://player.youku.com/player.php/sid/$1/v.swf",{templateRegex:/.*id_(.+)\.html.*/,embedtag:{width:480,height:400,nocache:1}}),new b.fn.oembed.OEmbedProvider("tudou",
"video",["tudou.com/programs/view/.+/"],"http://www.tudou.com/v/$1/v.swf",{templateRegex:/.*view\/(.+)\//,embedtag:{width:480,height:400,nocache:1}}),new b.fn.oembed.OEmbedProvider("embedr","video",["embedr\\.com/playlist/.+"],"http://embedr.com/swf/slider/$1/425/520/default/false/std?",{templateRegex:/.*playlist\/([^\/]+).*/,embedtag:{width:425,height:520}}),new b.fn.oembed.OEmbedProvider("blip","video",["blip\\.tv/.+"],"http://blip.tv/oembed/"),new b.fn.oembed.OEmbedProvider("minoto-video","video",
["http://api.minoto-video.com/publishers/.+/videos/.+","http://dashboard.minoto-video.com/main/video/details/.+","http://embed.minoto-video.com/.+"],"http://api.minoto-video.com/services/oembed.json",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("animoto","video",["animoto.com/play/.+"],"http://animoto.com/services/oembed"),new b.fn.oembed.OEmbedProvider("hulu","video",["hulu\\.com/watch/.*"],"http://www.hulu.com/api/oembed.json"),new b.fn.oembed.OEmbedProvider("ustream","video",["ustream\\.tv/recorded/.*"],
"http://www.ustream.tv/oembed",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("videojug","video",["videojug\\.com/(film|payer|interview).*"],"http://www.videojug.com/oembed.json",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("sapo","video",["videos\\.sapo\\.pt/.*"],"http://videos.sapo.pt/oembed",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("vodpod","video",["vodpod.com/watch/.*"],"http://vodpod.com/oembed.js",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("vimeo","video",["www.vimeo.com/groups/.*/videos/.*",
"www.vimeo.com/.*","vimeo.com/groups/.*/videos/.*","vimeo.com/.*"],"//vimeo.com/api/oembed.json"),new b.fn.oembed.OEmbedProvider("dailymotion","video",["dailymotion\\.com/.+"],"http://www.dailymotion.com/services/oembed"),new b.fn.oembed.OEmbedProvider("5min","video",["www\\.5min\\.com/.+"],"http://api.5min.com/oembed.xml",{useYQL:"xml"}),new b.fn.oembed.OEmbedProvider("National Film Board of Canada","video",["nfb\\.ca/film/.+"],"http://www.nfb.ca/remote/services/oembed/",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("qik",
"video",["qik\\.com/\\w+"],"http://qik.com/api/oembed.json",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("revision3","video",["revision3\\.com"],"http://revision3.com/api/oembed/"),new b.fn.oembed.OEmbedProvider("dotsub","video",["dotsub\\.com/view/.+"],"http://dotsub.com/services/oembed",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("clikthrough","video",["clikthrough\\.com/theater/video/\\d+"],"http://clikthrough.com/services/oembed"),new b.fn.oembed.OEmbedProvider("Kinomap","video",["kinomap\\.com/.+"],
"http://www.kinomap.com/oembed"),new b.fn.oembed.OEmbedProvider("VHX","video",["vhx.tv/.+"],"http://vhx.tv/services/oembed.json"),new b.fn.oembed.OEmbedProvider("bambuser","video",["bambuser.com/.+"],"http://api.bambuser.com/oembed/iframe.json"),new b.fn.oembed.OEmbedProvider("justin.tv","video",["justin.tv/.+"],"http://api.justin.tv/api/embed/from_url.json",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("official.fm","rich",["official.fm/.+"],"http://official.fm/services/oembed",{useYQL:"json"}),
new b.fn.oembed.OEmbedProvider("chirbit","rich",["chirb.it/.+"],"http://chirb.it/oembed.json",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("Huffduffer","rich",["huffduffer.com/[-.\\w@]+/\\d+"],"http://huffduffer.com/oembed"),new b.fn.oembed.OEmbedProvider("Spotify","rich",["open.spotify.com/(track|album)/"],"https://embed.spotify.com/oembed/"),new b.fn.oembed.OEmbedProvider("shoudio","rich",["shoudio.com/.+","shoud.io/.+"],"http://shoudio.com/api/oembed"),new b.fn.oembed.OEmbedProvider("mixcloud",
"rich",["mixcloud.com/.+"],k()+"www.mixcloud.com/oembed/",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("rdio.com","rich",["rd.io/.+","rdio.com"],k()+"www.rdio.com/api/oembed/"),new b.fn.oembed.OEmbedProvider("Soundcloud","rich",["soundcloud.com/.+","snd.sc/.+"],k()+"soundcloud.com/oembed",{format:"js"}),new b.fn.oembed.OEmbedProvider("bandcamp","rich",["bandcamp\\.com/album/.+"],null,{yql:{xpath:"//meta[contains(@content, \\'EmbeddedPlayer\\')]",from:"html",datareturn:function(a){return a.meta?
'<iframe width="400" height="100" src="'+a.meta.content+'" allowtransparency="true" frameborder="0"></iframe>':!1}}}),new b.fn.oembed.OEmbedProvider("deviantart","photo",["deviantart.com/.+","fav.me/.+","deviantart.com/.+"],"http://backend.deviantart.com/oembed",{format:"jsonp"}),new b.fn.oembed.OEmbedProvider("skitch","photo",["skitch.com/.+"],null,{yql:{xpath:"json",from:"json",url:function(a){return"http://skitch.com/oembed/?format=json&url="+a},datareturn:function(a){return b.fn.oembed.getPhotoCode(a.json.url,
a.json)}}}),new b.fn.oembed.OEmbedProvider("mobypicture","photo",["mobypicture.com/user/.+/view/.+","moby.to/.+"],"http://api.mobypicture.com/oEmbed"),new b.fn.oembed.OEmbedProvider("flickr","photo",["flickr\\.com/photos/.+"],"http://flickr.com/services/oembed",{callbackparameter:"jsoncallback"}),new b.fn.oembed.OEmbedProvider("photobucket","photo",["photobucket\\.com/(albums|groups)/.+"],k()+"photobucket.com/oembed/"),new b.fn.oembed.OEmbedProvider("instagram","photo",["instagr\\.?am(\\.com)?/.+"],
k()+"api.instagram.com/oembed"),new b.fn.oembed.OEmbedProvider("SmugMug","photo",["smugmug.com/[-.\\w@]+/.+"],"http://api.smugmug.com/services/oembed/"),new b.fn.oembed.OEmbedProvider("dribbble","photo",["dribbble.com/shots/.+"],"http://api.dribbble.com/shots/$1?callback=?",{templateRegex:/.*shots\/([\d]+).*/,templateData:function(a){return!a.image_teaser_url?!1:'<img src="'+a.image_teaser_url+'"/>'}}),new b.fn.oembed.OEmbedProvider("chart.ly","photo",["chart\\.ly/[a-z0-9]{6,8}"],"http://chart.ly/uploads/large_$1.png",
{templateRegex:/.*ly\/([^\/]+).*/,embedtag:{tag:"img"},nocache:1}),new b.fn.oembed.OEmbedProvider("circuitlab","photo",["circuitlab.com/circuit/.+"],"https://www.circuitlab.com/circuit/$1/screenshot/540x405/",{templateRegex:/.*circuit\/([^\/]+).*/,embedtag:{tag:"img"},nocache:1}),new b.fn.oembed.OEmbedProvider("23hq","photo",["23hq.com/[-.\\w@]+/photo/.+"],"http://www.23hq.com/23/oembed",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("img.ly","photo",["img\\.ly/.+"],"http://img.ly/show/thumb/$1",
{templateRegex:/.*ly\/([^\/]+).*/,embedtag:{tag:"img"},nocache:1}),new b.fn.oembed.OEmbedProvider("twitgoo.com","photo",["twitgoo\\.com/.+"],"http://twitgoo.com/show/thumb/$1",{templateRegex:/.*com\/([^\/]+).*/,embedtag:{tag:"img"},nocache:1}),new b.fn.oembed.OEmbedProvider("imgur.com","photo",["imgur\\.com/gallery/.+"],k()+"imgur.com/$1l.jpg",{templateRegex:/.*gallery\/([^\/]+).*/,embedtag:{tag:"img"},nocache:1}),new b.fn.oembed.OEmbedProvider("visual.ly","rich",["visual\\.ly/.+"],null,{yql:{xpath:"//a[@id=\\'gc_article_graphic_image\\']/img",
from:"htmlstring"}}),new b.fn.oembed.OEmbedProvider("gravtar","photo",["mailto:.+"],null,{templateRegex:/mailto:([^\/]+).*/,template:function(a,b){return'<img src="http://gravatar.com/avatar/'+b.md5()+'.jpg" alt="on Gravtar" class="jqoaImg">'}}),new b.fn.oembed.OEmbedProvider("twitter","rich",["twitter.com/.+"],"https://api.twitter.com/1/statuses/oembed.json"),new b.fn.oembed.OEmbedProvider("gmep","rich",["gmep.imeducate.com/.*","gmep.org/.*"],"http://gmep.org/oembed.json"),new b.fn.oembed.OEmbedProvider("urtak",
"rich",["urtak.com/(u|clr)/.+"],"http://oembed.urtak.com/1/oembed"),new b.fn.oembed.OEmbedProvider("cacoo","rich",["cacoo.com/.+"],"http://cacoo.com/oembed.json"),new b.fn.oembed.OEmbedProvider("dailymile","rich",["dailymile.com/people/.*/entries/.*"],"http://api.dailymile.com/oembed"),new b.fn.oembed.OEmbedProvider("dipity","rich",["dipity.com/timeline/.+"],"http://www.dipity.com/oembed/timeline/",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("sketchfab","rich",["sketchfab.com/show/.+"],"http://sketchfab.com/oembed",
{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("speakerdeck","rich",["speakerdeck.com/.+"],"http://speakerdeck.com/oembed.json",{useYQL:"json"}),new b.fn.oembed.OEmbedProvider("popplet","rich",["popplet.com/app/.*"],"http://popplet.com/app/Popplet_Alpha.swf?page_id=$1&em=1",{templateRegex:/.*#\/([^\/]+).*/,embedtag:{width:460,height:460}}),new b.fn.oembed.OEmbedProvider("pearltrees","rich",["pearltrees.com/.*"],"http://cdn.pearltrees.com/s/embed/getApp?",{templateRegex:/.*N-f=1_(\d+).*N-p=(\d+).*/,
embedtag:{width:460,height:460,flashvars:"lang=en_US&amp;embedId=pt-embed-$1-693&amp;treeId=$1&amp;pearlId=$2&amp;treeTitle=Diagrams%2FVisualization&amp;site=www.pearltrees.com%2FF"}}),new b.fn.oembed.OEmbedProvider("prezi","rich",["prezi.com/.*"],"http://prezi.com/bin/preziloader.swf?",{templateRegex:/.*com\/([^\/]+)\/.*/,embedtag:{width:550,height:400,flashvars:"prezi_id=$1&amp;lock_to_path=0&amp;color=ffffff&amp;autoplay=no&amp;autohide_ctrls=0"}}),new b.fn.oembed.OEmbedProvider("tourwrist","rich",
["tourwrist.com/tours/.+"],null,{templateRegex:/.*tours.([\d]+).*/,template:function(a,b){setTimeout(function(){loadEmbeds&&loadEmbeds()},2E3);return"<div id='"+b+"' class='tourwrist-tour-embed direct'></div> <script type='text/javascript' src='http://tourwrist.com/tour_embed.js'><\/script>"}}),new b.fn.oembed.OEmbedProvider("meetup","rich",["meetup\\.(com|ps)/.+"],k()+"api.meetup.com/oembed"),new b.fn.oembed.OEmbedProvider("ebay","rich",["ebay\\.*"],k()+"togo.ebay.com/togo/togo.swf?2008013100",{templateRegex:/.*\/([^\/]+)\/(\d{10,13}).*/,
embedtag:{width:355,height:300,flashvars:"base=http://togo.ebay.com/togo/&lang=en-us&mode=normal&itemid=$2&query=$1"}}),new b.fn.oembed.OEmbedProvider("wikipedia","rich",["wikipedia.org/wiki/.+"],"http://$1.wikipedia.org/w/api.php?action=parse&page=$2&format=json&section=0&callback=?",{templateRegex:/.*\/\/([\w]+).*\/wiki\/([^\/]+).*/,templateData:function(a){if(!a.parse)return!1;var b=a.parse.text["*"].replace(/href="\/wiki/g,'href="http://en.wikipedia.org/wiki');return'<div id="content"><h3><a class="nav-link" href="http://en.wikipedia.org/wiki/'+
a.parse.displaytitle+'">'+a.parse.displaytitle+"</a></h3>"+b+"</div>"}}),new b.fn.oembed.OEmbedProvider("imdb","rich",["imdb.com/title/.+"],"http://www.imdbapi.com/?i=$1&callback=?",{templateRegex:/.*\/title\/([^\/]+).*/,templateData:function(a){return!a.Title?!1:'<div id="content"><h3><a class="nav-link" href="http://imdb.com/title/'+a.ID+'/">'+a.Title+"</a> ("+a.Year+")</h3><p>Starring: "+a.Actors+'</p><div id="photo-wrap" style="margin: auto;width:600px;height:450px;"><img class="photo" id="photo-display" src="'+
a.Poster+'" alt="'+a.Title+'"></div>  <div id="view-photo-caption">'+a.Plot+"</div></div>"}}),new b.fn.oembed.OEmbedProvider("livejournal","rich",["livejournal.com/"],"http://ljpic.seacrow.com/json/$2$4?jsonp=?",{templateRegex:/(http:\/\/(((?!users).)+)\.livejournal\.com|.*users\.livejournal\.com\/([^\/]+)).*/,templateData:function(a){return!a.username?!1:'<div><img src="'+a.image+'" align="left" style="margin-right: 1em;" /><span class="oembedall-ljuser"><a href="http://'+a.username+'.livejournal.com/profile"><img src="http://www.livejournal.com/img/userinfo.gif" alt="[info]" width="17" height="17" /></a><a href="http://'+
a.username+'.livejournal.com/">'+a.username+"</a></span><br />"+a.name+"</div>"}}),new b.fn.oembed.OEmbedProvider("circuitbee","rich",["circuitbee\\.com/circuit/view/.+"],"http://c.circuitbee.com/build/r/schematic-embed.html?id=$1",{templateRegex:/.*circuit\/view\/(\d+).*/,embedtag:{tag:"iframe",width:"500",height:"350"}}),new b.fn.oembed.OEmbedProvider("googlecalendar","rich",["www.google.com/calendar/embed?.+"],"$1",{templateRegex:/(.*)/,embedtag:{tag:"iframe",width:"800",height:"600"}}),new b.fn.oembed.OEmbedProvider("jsfiddle",
"rich",["jsfiddle.net/[^/]+/?"],"http://jsfiddle.net/$1/embedded/result,js,resources,html,css/?",{templateRegex:/.*net\/([^\/]+).*/,embedtag:{tag:"iframe",width:"100%",height:"300"}}),new b.fn.oembed.OEmbedProvider("jsbin","rich",["jsbin.com/.+"],"http://jsbin.com/$1/?",{templateRegex:/.*com\/([^\/]+).*/,embedtag:{tag:"iframe",width:"100%",height:"300"}}),new b.fn.oembed.OEmbedProvider("jotform","rich",["form.jotform.co/form/.+"],"$1?",{templateRegex:/(.*)/,embedtag:{tag:"iframe",width:"100%",height:"507"}}),
new b.fn.oembed.OEmbedProvider("reelapp","rich",["reelapp\\.com/.+"],"http://www.reelapp.com/$1/embed",{templateRegex:/.*com\/(\S{6}).*/,embedtag:{tag:"iframe",width:"400",height:"338"}}),new b.fn.oembed.OEmbedProvider("linkedin","rich",["linkedin.com/pub/.+"],"https://www.linkedin.com/cws/member/public_profile?public_profile_url=$1&format=inline&isFramed=true",{templateRegex:/(.*)/,embedtag:{tag:"iframe",width:"368px",height:"auto"}}),new b.fn.oembed.OEmbedProvider("timetoast","rich",["timetoast.com/timelines/[0-9]+"],
"http://www.timetoast.com/flash/TimelineViewer.swf?passedTimelines=$1",{templateRegex:/.*timelines\/([0-9]*)/,embedtag:{width:550,height:400,nocache:1}}),new b.fn.oembed.OEmbedProvider("pastebin","rich",["pastebin\\.com/[\\S]{8}"],"http://pastebin.com/embed_iframe.php?i=$1",{templateRegex:/.*\/(\S{8}).*/,embedtag:{tag:"iframe",width:"100%",height:"auto"}}),new b.fn.oembed.OEmbedProvider("mixlr","rich",["mixlr.com/.+"],"http://mixlr.com/embed/$1?autoplay=ae",{templateRegex:/.*com\/([^\/]+).*/,embedtag:{tag:"iframe",
width:"100%",height:"auto"}}),new b.fn.oembed.OEmbedProvider("pastie","rich",["pastie\\.org/pastes/.+"],null,{yql:{xpath:'//pre[@class="textmate-source"]'}}),new b.fn.oembed.OEmbedProvider("github","rich",["gist.github.com/.+"],"https://github.com/api/oembed"),new b.fn.oembed.OEmbedProvider("github","rich",["github.com/[-.\\w@]+/[-.\\w@]+"],"https://api.github.com/repos/$1/$2?callback=?",{templateRegex:/.*\/([^\/]+)\/([^\/]+).*/,templateData:function(a){return!a.data.html_url?!1:'<div class="oembedall-githubrepos"><ul class="oembedall-repo-stats"><li>'+
a.data.language+'</li><li class="oembedall-watchers"><a title="Watchers" href="'+a.data.html_url+'/watchers">&#x25c9; '+a.data.watchers+'</a></li><li class="oembedall-forks"><a title="Forks" href="'+a.data.html_url+'/network">&#x0265; '+a.data.forks+'</a></li></ul><h3><a href="'+a.data.html_url+'">'+a.data.name+'</a></h3><div class="oembedall-body"><p class="oembedall-description">'+a.data.description+'</p><p class="oembedall-updated-at">Last updated: '+a.data.pushed_at+"</p></div></div>"}}),new b.fn.oembed.OEmbedProvider("facebook",
"rich",["facebook.com/(people/[^\\/]+/\\d+|[^\\/]+$)"],"https://graph.facebook.com/$2$3/?callback=?",{templateRegex:/.*facebook.com\/(people\/[^\/]+\/(\d+).*|([^\/]+$))/,templateData:function(a){if(!a.id)return!1;var b='<div class="oembedall-facebook1"><div class="oembedall-facebook2"><a href="http://www.facebook.com/">facebook</a> ',b=a.from?b+('<a href="http://www.facebook.com/'+a.from.id+'">'+a.from.name+"</a>"):a.link?b+('<a href="'+a.link+'">'+a.name+"</a>"):a.username?b+('<a href="http://www.facebook.com/'+
a.username+'">'+a.name+"</a>"):b+('<a href="http://www.facebook.com/'+a.id+'">'+a.name+"</a>"),b=b+'</div><div class="oembedall-facebookBody"><div class="contents">',b=a.picture?b+('<a href="'+a.link+'"><img src="'+a.picture+'"></a>'):b+('<img src="https://graph.facebook.com/'+a.id+'/picture">');a.from&&(b+='<a href="'+a.link+'">'+a.name+"</a>");a.founded&&(b+="Founded: <strong>"+a.founded+"</strong><br>");a.category&&(b+="Category: <strong>"+a.category+"</strong><br>");a.website&&(b+='Website: <strong><a href="'+
a.website+'">'+a.website+"</a></strong><br>");a.gender&&(b+="Gender: <strong>"+a.gender+"</strong><br>");a.description&&(b+=a.description+"<br>");return b+"</div></div>"}}),new b.fn.oembed.OEmbedProvider("stackoverflow","rich",["stackoverflow.com/questions/[\\d]+"],"http://api.stackoverflow.com/1.1/questions/$1?body=true&jsonp=?",{templateRegex:/.*questions\/([\d]+).*/,templateData:function(a){if(!a.questions)return!1;var a=a.questions[0],e=b(a.body).text(),e='<div class="oembedall-stoqembed"><div class="oembedall-statscontainer"><div class="oembedall-statsarrow"></div><div class="oembedall-stats"><div class="oembedall-vote"><div class="oembedall-votes"><span class="oembedall-vote-count-post"><strong>'+
(a.up_vote_count-a.down_vote_count)+'</strong></span><div class="oembedall-viewcount">vote(s)</div></div></div><div class="oembedall-status"><strong>'+a.answer_count+'</strong>answer</div></div><div class="oembedall-views">'+a.view_count+' view(s)</div></div><div class="oembedall-summary"><h3><a class="oembedall-question-hyperlink" href="http://stackoverflow.com/questions/'+a.question_id+'/">'+a.title+'</a></h3><div class="oembedall-excerpt">'+e.substring(0,100)+'...</div><div class="oembedall-tags">';
for(i in a.tags)e+='<a title="" class="oembedall-post-tag" href="http://stackoverflow.com/questions/tagged/'+a.tags[i]+'">'+a.tags[i]+"</a>";return e+='</div><div class="oembedall-fr"><div class="oembedall-user-info"><div class="oembedall-user-gravatar32"><a href="http://stackoverflow.com/users/'+a.owner.user_id+"/"+a.owner.display_name+'"><img width="32" height="32" alt="" src="http://www.gravatar.com/avatar/'+a.owner.email_hash+'?s=32&amp;d=identicon&amp;r=PG"></a></div><div class="oembedall-user-details"><a href="http://stackoverflow.com/users/'+
a.owner.user_id+"/"+a.owner.display_name+'">'+a.owner.display_name+'</a><br><span title="reputation score" class="oembedall-reputation-score">'+a.owner.reputation+"</span></div></div></div></div></div>"}}),new b.fn.oembed.OEmbedProvider("wordpress","rich",["wordpress\\.com/.+","blogs\\.cnn\\.com/.+","techcrunch\\.com/.+","wp\\.me/.+"],"http://public-api.wordpress.com/oembed/1.0/?for=jquery-oembed-all"),new b.fn.oembed.OEmbedProvider("screenr","rich",["screenr.com"],"http://www.screenr.com/embed/$1",
{templateRegex:/.*\/([^\/]+).*/,embedtag:{tag:"iframe",width:"650",height:396}}),new b.fn.oembed.OEmbedProvider("gigpans","rich",["gigapan\\.org/[-.\\w@]+/\\d+"],"http://gigapan.org/gigapans/$1/options/nosnapshots/iframe/flash.html",{templateRegex:/.*\/(\d+)\/?.*/,embedtag:{tag:"iframe",width:"100%",height:400}}),new b.fn.oembed.OEmbedProvider("scribd","rich",["scribd\\.com/.+"],k()+"www.scribd.com/embeds/$1/content?start_page=1&view_mode=list",{templateRegex:/.*doc\/([^\/]+).*/,embedtag:{tag:"iframe",
width:"100%",height:600}}),new b.fn.oembed.OEmbedProvider("kickstarter","rich",["kickstarter\\.com/projects/.+"],"$1/widget/card.html",{templateRegex:/([^\?]+).*/,embedtag:{tag:"iframe",width:"220",height:380}}),new b.fn.oembed.OEmbedProvider("amazon","rich",["amzn.com/B+","amazon.com.*/(B\\S+)($|\\/.*)"],k()+"rcm.amazon.com/e/cm?t=_APIKEY_&o=1&p=8&l=as1&asins=$1&ref=qf_br_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr",{apikey:!0,templateRegex:/.*\/(B[0-9A-Z]+)($|\/.*)/,
embedtag:{tag:"iframe",width:"120px",height:"240px"}}),new b.fn.oembed.OEmbedProvider("slideshare","rich",["slideshare.net"],k()+"www.slideshare.net/api/oembed/2",{format:"jsonp"}),new b.fn.oembed.OEmbedProvider("roomsharejp","rich",["roomshare\\.jp/(en/)?post/.*"],"http://roomshare.jp/oembed.json"),new b.fn.oembed.OEmbedProvider("lanyard","rich",["lanyrd.com/\\d+/.+"],null,{yql:{xpath:'(//div[@class="primary"])[1]',from:"htmlstring",datareturn:function(a){return!a.result?!1:'<div class="oembedall-lanyard">'+
a.result+"</div>"}}}),new b.fn.oembed.OEmbedProvider("asciiartfarts","rich",["asciiartfarts.com/\\d+.html"],null,{yql:{xpath:"//pre/font",from:"htmlstring",datareturn:function(a){return!a.result?!1:'<pre style="background-color:000;">'+a.result+"</div>"}}}),new b.fn.oembed.OEmbedProvider("opengraph","rich",[".*"],null,{yql:{xpath:"//meta|//title|//link",from:"html",datareturn:function(a){!a["og:title"]&&(a.title&&a.description)&&(a["og:title"]=a.title);if(!a["og:title"]&&!a.title)return!1;var e=b("<p/>");
if(a["og:video"]){var c=b('<embed src="'+a["og:video"]+'"/>');c.attr("type",a["og:video:type"]||"application/x-shockwave-flash").css("max-height",j.maxHeight||"auto").css("max-width",j.maxWidth||"auto");a["og:video:width"]&&c.attr("width",a["og:video:width"]);a["og:video:height"]&&c.attr("height",a["og:video:height"]);e.append(c)}else a["og:image"]&&(c=b('<img src="'+a["og:image"]+'">'),c.css("max-height",j.maxHeight||"auto").css("max-width",j.maxWidth||"auto"),a["og:image:width"]&&c.attr("width",
a["og:image:width"]),a["og:image:height"]&&c.attr("height",a["og:image:height"]),e.append(c));a["og:title"]&&e.append("<b>"+a["og:title"]+"</b><br/>");a["og:description"]?e.append(a["og:description"]+"<br/>"):a.description&&e.append(a.description+"<br/>");return e}}})]})(jQuery);
String.prototype.md5=function(){var b=function(b,k){var j=(b&65535)+(k&65535);return(b>>16)+(k>>16)+(j>>16)<<16|j&65535},k=function(e,k,j,a,l,c){e=b(b(k,e),b(a,c));return b(e<<l|e>>>32-l,j)},n=function(b,p,j,a,l,c,m){return k(p&j|~p&a,b,p,l,c,m)},o=function(b,p,j,a,l,c,m){return k(p&a|j&~a,b,p,l,c,m)},m=function(b,m,j,a,l,c,n){return k(j^(m|~a),b,m,l,c,n)};return function(b){var k="",j,a=4*b.length;for(j=0;j<a;j++)k+="0123456789abcdef".charAt(b[j>>2]>>8*(j%4)+4&15)+"0123456789abcdef".charAt(b[j>>
2]>>8*(j%4)&15);return k}(function(e){var p,j,a,l,c,t=e.length,h=1732584193,f=-271733879,d=-1732584194,g=271733878;for(c=0;c<t;c+=16)p=h,j=f,a=d,l=g,h=n(h,f,d,g,e[c+0],7,-680876936),g=n(g,h,f,d,e[c+1],12,-389564586),d=n(d,g,h,f,e[c+2],17,606105819),f=n(f,d,g,h,e[c+3],22,-1044525330),h=n(h,f,d,g,e[c+4],7,-176418897),g=n(g,h,f,d,e[c+5],12,1200080426),d=n(d,g,h,f,e[c+6],17,-1473231341),f=n(f,d,g,h,e[c+7],22,-45705983),h=n(h,f,d,g,e[c+8],7,1770035416),g=n(g,h,f,d,e[c+9],12,-1958414417),d=n(d,g,h,f,e[c+
10],17,-42063),f=n(f,d,g,h,e[c+11],22,-1990404162),h=n(h,f,d,g,e[c+12],7,1804603682),g=n(g,h,f,d,e[c+13],12,-40341101),d=n(d,g,h,f,e[c+14],17,-1502002290),f=n(f,d,g,h,e[c+15],22,1236535329),h=o(h,f,d,g,e[c+1],5,-165796510),g=o(g,h,f,d,e[c+6],9,-1069501632),d=o(d,g,h,f,e[c+11],14,643717713),f=o(f,d,g,h,e[c+0],20,-373897302),h=o(h,f,d,g,e[c+5],5,-701558691),g=o(g,h,f,d,e[c+10],9,38016083),d=o(d,g,h,f,e[c+15],14,-660478335),f=o(f,d,g,h,e[c+4],20,-405537848),h=o(h,f,d,g,e[c+9],5,568446438),g=o(g,h,f,
d,e[c+14],9,-1019803690),d=o(d,g,h,f,e[c+3],14,-187363961),f=o(f,d,g,h,e[c+8],20,1163531501),h=o(h,f,d,g,e[c+13],5,-1444681467),g=o(g,h,f,d,e[c+2],9,-51403784),d=o(d,g,h,f,e[c+7],14,1735328473),f=o(f,d,g,h,e[c+12],20,-1926607734),h=k(f^d^g,h,f,e[c+5],4,-378558),g=k(h^f^d,g,h,e[c+8],11,-2022574463),d=k(g^h^f,d,g,e[c+11],16,1839030562),f=k(d^g^h,f,d,e[c+14],23,-35309556),h=k(f^d^g,h,f,e[c+1],4,-1530992060),g=k(h^f^d,g,h,e[c+4],11,1272893353),d=k(g^h^f,d,g,e[c+7],16,-155497632),f=k(d^g^h,f,d,e[c+10],
23,-1094730640),h=k(f^d^g,h,f,e[c+13],4,681279174),g=k(h^f^d,g,h,e[c+0],11,-358537222),d=k(g^h^f,d,g,e[c+3],16,-722521979),f=k(d^g^h,f,d,e[c+6],23,76029189),h=k(f^d^g,h,f,e[c+9],4,-640364487),g=k(h^f^d,g,h,e[c+12],11,-421815835),d=k(g^h^f,d,g,e[c+15],16,530742520),f=k(d^g^h,f,d,e[c+2],23,-995338651),h=m(h,f,d,g,e[c+0],6,-198630844),g=m(g,h,f,d,e[c+7],10,1126891415),d=m(d,g,h,f,e[c+14],15,-1416354905),f=m(f,d,g,h,e[c+5],21,-57434055),h=m(h,f,d,g,e[c+12],6,1700485571),g=m(g,h,f,d,e[c+3],10,-1894986606),
d=m(d,g,h,f,e[c+10],15,-1051523),f=m(f,d,g,h,e[c+1],21,-2054922799),h=m(h,f,d,g,e[c+8],6,1873313359),g=m(g,h,f,d,e[c+15],10,-30611744),d=m(d,g,h,f,e[c+6],15,-1560198380),f=m(f,d,g,h,e[c+13],21,1309151649),h=m(h,f,d,g,e[c+4],6,-145523070),g=m(g,h,f,d,e[c+11],10,-1120210379),d=m(d,g,h,f,e[c+2],15,718787259),f=m(f,d,g,h,e[c+9],21,-343485551),h=b(h,p),f=b(f,j),d=b(d,a),g=b(g,l);return[h,f,d,g]}(function(b){var k=(b.length+8>>6)+1,j=[],a,l=16*k,c=b.length;for(a=0;a<l;a++)j.push(0);for(a=0;a<c;a++)j[a>>
2]|=(b.charCodeAt(a)&255)<<8*(a%4);j[a>>2]|=128<<8*(a%4);j[16*k-2]=8*c;return j}(this)))};

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr=$('#street').val();
    var cityStr=$('#city').val();
    var address=streetStr+','+cityStr;
    $greeting.text("So you want to live in "+address+"?");
    var streetviewURL='https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'&heading=151.78&pitch=-0.76&key=AIzaSyAF_a6tMJ15HMZF3mAkYYrHeuXR3ARLTZ0';
    $body.append('<img class="bgimg" src="'+streetviewURL+'">');
    console.log("You are great");
    //UR CODE GOES HERE!
    // Built by LucyBot. www.lucybot.com
    //NewYork Times API
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "49e3b496071d48ee9afabe47a1f6f5ab",
  'q': ""+streetStr+"",
  'sort': "newest",
  'fl': "web_url,snippet,headline"
});
console.log(url);


$.getJSON( url, function( data ) {
  $nytHeaderElem.text("NewYork Times Article about: "+address);
  var articles =data.response.docs;
  for(var i=0;i<articles.length;i++)
  {
    var article=articles[i];
    $nytElem.append('<li class="article">'+
                    '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                      '<p>'+article.snippet+'</p></li>');
  }
}).error(function(){

  $nytHeaderElem.text("NewYork Times Article could not be loaded");
});


//Wikepedia request
var wikiRequestTimeout=setTimeout(function(){
  $wikiElem.append("Wikepedia links could not be loaded");
},6000);

var wikiURL='http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=?';   //error handling
$.ajax({
  url:wikiURL,
  dataType:"jsonp",
  success:function(response){
    console.log(response);
    var articleList=response[1];
    for(var j=0;j<articleList.length;j++)
    {
      var articleURL='http://en.wikipedia.org/wiki/'+articleList[j];
      $wikiElem.append('<li>'+
                      '<a href="'+articleURL+'">'+articleList[j]+'</a></li>');
    }
    clearTimeout(wikiRequestTimeout);
  }
});

return false;
};

$('#form-container').submit(loadData);

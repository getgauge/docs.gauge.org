$(document).ready(() => {
  var faqToc = $('.faq-toc');

  if(faqToc) {
    // get all H2 nodes, these are the groups in the ToC
    var root = $('.faq-toc > ul');
    // remove the H1 from toc.
    faqToc.append($('.faq-toc > ul > li > ul'));
    root.remove();
    faqToc.insertAfter('#faqs > h1');

    $('ul > li > ul > li > ul', faqToc).remove();
    // faqToc.remove();
  }

  // remove container class to prevent overlap with sidebar
  $('.tab, .tabs').removeClass('container');
  
  // create tabs from content
  $('div.tabs').each(function() {
    var tabSelector = $('<ul />', { class: "tab-selector nav nav-pills" });
    var i = 0;

    $('.tab', this).each(function() {
      var tab = $('<li />', {
        class: $(this).attr('id'),
      });
      var tabanchor = $('<a />', {
        text: $(this).find('.tab-title').text()
      });
      tab.append(tabanchor);

      $(this).find('.tab-title').remove();
      if (i++) {
          $(this).hide();
      } else {
          tab.addClass('active');
      }
      tabSelector.append(tab);
    });

    $('.tab', this).eq(0).before(tabSelector);
    tabSelector = null;
    i = null;
  });

  $('.tab-selector li').click(function(e) {
    e.preventDefault();
    if($(this).hasClass('active')) return;
    
    var tabs = $(this).parents('.tabs');

    var sel_class = $(this).attr('class');
    $('div.tab',tabs).hide();
    $('div#' + sel_class, tabs).show();

    $('ul.tab-selector li', tabs).removeClass('active');
    $('ul.tab-selector li.' + sel_class, tabs).addClass('active');

    sel_class = null;
  });

  var location = window.location.pathname;
  var version = location.substring(1, location.lastIndexOf('/'));
  // wire up algolia search
  docsearch({
    apiKey: '5008b0d9ea4d9e639a17a123bea077fe',
    indexName: 'gauge',
    inputSelector: '#search',
    algoliaOptions: { 'facetFilters': ["version:" + version] },
    debug: false // Set debug to true if you want to inspect the dropdown
  });

  $('ul.localtoc ul ul ul').remove();
  
  // remove nested container classes, prevent overlap with sidebar
  $('.container .container').removeClass('container');

  // ===== Scroll to Top ==== 
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
  });
  
  $('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
  });
  
  $('ul.localtoc a').click(function(){
    var sectionId = $(this).attr('href');

    $('body,html').animate({
      scrollTop : $(sectionId).offset().top                       
  }, 500);
  });

  $('.headerlink').click(function(){
    var sectionId = $(this).attr('href');
    $('body,html').animate({
      scrollTop : $(sectionId).offset().top                       
    }, 500);
  });

});


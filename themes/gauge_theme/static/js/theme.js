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

  // wire up algolia search
  docsearch({
    apiKey: '5008b0d9ea4d9e639a17a123bea077fe',
    indexName: 'gauge',
    inputSelector: '#search',
    debug: false // Set debug to true if you want to inspect the dropdown
  });

  $('ul.localtoc ul ul ul, ul.localtoc > ul > li > a').remove();
  
  // remove nested container classes, prevent overlap with sidebar
  $('.container .container').removeClass('container');

  // sidebar menu scroll spy.
  var lastId,
  rightNav = $("#rightNav .localtoc"),
  rightNavHeight = rightNav.outerHeight()+15,
  menuItems = rightNav.find("a").not("[href='#']"),
  scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });

  menuItems.click(function(e){
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-rightNavHeight+1;
    $('html, body').stop().animate({ 
      scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  $(window).scroll(function(){
    var fromTop = $(this).scrollTop()+rightNavHeight;
    var cur = scrollItems.map(function(){
    if ($(this).offset().top < fromTop)
      return this;
    });
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      menuItems
        .parent().removeClass("active")
        .end().filter("[href='#"+id+"']").parent().addClass("active");
    }                   
  });
});
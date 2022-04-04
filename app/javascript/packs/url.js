remaining_url = [] // for sync when offline
  $(document).ready(function() {
  var url_list = [];
   $.ajax({
      type:'GET',
      url:'/all_urls',
      success:function(data){
        if (data != '')
        {
          jQuery.each(data, function(i, v) {
            url_list.push(data[i])
          })
        }
        display_list(url_list); // on page load create list
      }
    });
  });

  // on page load set saved urls
  function display_list(url_list) {
    jQuery.each(url_list, function(i, v) {
      var ListData=`<li class="list-group-item">`+ url_list[i]['url']+`</li>`;
      $('.url-content').find('.list-group').append(ListData);
    })
  };

  // for add li at the first element of ul
  function add_li_first_child(url_list) {
    jQuery.each(url_list, function(i, v) {
      createElement = document.createElement('li');
      createElement.className = 'list-group-item'
      createElement.textContent = url_list[i]['url']
      let menu = document.getElementById('menu'); // get current ul
      insertAfter(createElement,  menu.firstElementChild);
    })
  };

  // insert after childElement span
  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  // for data sync at every 15 sec
  setInterval(remaining_url_create,15000);

  // for data sync
  function remaining_url_create(){
    console.log('running')
    if (remaining_url.length > 0 && navigator.onLine) {
      jQuery.each(remaining_url, function(i) {
       create_url(remaining_url[i])
     });
     remaining_url = [];
    }  
  };

  // Insert into Database using AJAX call
  function create_url(value) {
    $.ajax({
      type:'POST',
      url:'/urls',
      data: {"url": {"url": value}, "commit": "Create Url"},
      success: function(data){
        console.log(data);
      }
    });
  }

  // form submit data validator if all okay then submit else false
  $('.form_submit').submit(function(event) {
    url = $(this).find('#url_url').val();
    if (url != ''){
      var newElement = document.createElement('p'); // if value null then add new p 
      newElement.className = 'error';
      if (!validURL(url)){
        newElement.textContent =  'Please Enter Valid URL'
        $(this).parents('.url-content').find('.error').remove();
        $(this).parents('.url-content').find('.error_span').addClass('error-box');
        $(this).parents('.url-content').find('.error_span').after(newElement.outerHTML);
        return false
      }else{
        filter_host_check = filter_host(url)
        if (!filter_host_check) {
          newElement.textContent =  'URL Pattern IS Valid But URL Is Invalid. EX. (https://www.google.com/)'
          $(this).parents('.url-content').find('.error').remove();
          $(this).parents('.url-content').find('.error_span').addClass('error-box');
          $(this).parents('.url-content').find('.error_span').after(newElement.outerHTML);
          return false
        }else{
          $(this).find('#url_url').val(filter_host_check);
          $(this).parents('.url-content').find('.error_span').removeClass('error-box');
          $(this).parents('.url-content').find('.error').remove();
        }
      }
    var url_list = [];
    url_list.push({url: filter_host_check})
    add_li_first_child(url_list);
    if(navigator.onLine){ // if online then create
     create_url(filter_host_check)
    } else { // when offline then add to array
      remaining_url.push(filter_host_check);
    }
    $(this).find('#url_url').val('');
    }else{ 
      $(this).parents('.url-content').find('.error_span').removeClass('error-box');
      $(this).parents('.url-content').find('.error').remove();
    }
  });

  // if blank then remove error if present
  $('#url_url').change(function(event) {
    if(this.value == ''){
      $(this).parents('.url-content').find('.error_span').removeClass('error-box');
      $(this).parents('.url-content').find('.error').remove();
    }
  })

  // for url pattern match
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  // for filter domain from string
  function filter_host(url){
    url = setHttp(url)
    try {
      $(this).parents('.url-content').find('.error').remove();
      $(this).parents('.url-content').find('.error_span').removeClass('error-box');
      return (new URL(url)).hostname.replace('www.','');
    } catch (error) {
      return false
    }
  }

  function setHttp(link) {
    if (link.search(/^http[s]?\:\/\//) == -1) {
        link = 'http://' + link;
    }
    return link;
  }
/* =======   Dark Mode Toggle  ====== */

const dm = document.querySelector('.dark__mode'),
      root = document.documentElement;

dm.addEventListener('click',()=>{
  dm.classList.toggle('light__mode');
  if(dm.classList.contains('light__mode')){
    dm.innerHTML = '<i class="fa-solid fa-moon"></i>'

    root.style.setProperty('--hue-color', '242');
    root.style.setProperty('--skin-color', 'hsl(342, 92%, 46%)');
    root.style.setProperty('--title-color', 'hsl(var(--hue-color), 8%, 5%)');
    root.style.setProperty('--text-color', 'hsl(var(--hue-color), 8%, 5%)'); 
    root.style.setProperty('--body-color', 'hsl(var(--hue-color), 100%, 100%)');
    root.style.setProperty('--box-color', 'hsl(var(--hue-color), 100%, 96%)');
    root.style.setProperty('--scroll-bar-color', 'hsl(var(--hue-color), 0%, 80%)');
    root.style.setProperty('--scroll-thumb-color', 'hsl(var(--hue-color), 0%, 60%)');
  }
  else{
    dm.innerHTML = '<i class="fa-solid fa-sun-plant-wilt"></i>'

    root.style.setProperty('--hue-color', '242');
    root.style.setProperty('--skin-color', 'hsl(342, 92%, 46%)');
    root.style.setProperty('--title-color', 'hsl(var(--hue-color), 8%, 95%)');
    root.style.setProperty('--text-color', 'hsl(var(--hue-color), 8%, 85%)'); 
    root.style.setProperty('--body-color', 'hsl(var(--hue-color), 19%, 5%)');
    root.style.setProperty('--box-color', 'hsl(var(--hue-color), 14%, 10%)');
    root.style.setProperty('--scroll-bar-color', 'hsl(var(--hue-color), 12%, 38%)');
    root.style.setProperty('--scroll-thumb-color', 'hsl(var(--hue-color), 12%, 26%)');
  }
});


/* ===========  SKILLS TABS ========== */

const tabs = document.querySelectorAll('[data-target]'),
      tabContent = document.querySelectorAll('[data-content]'),
      ctabs = document.querySelectorAll('[data-ctarget]'),
      ctabContent = document.querySelectorAll('[data-ccontent]')

      tabs.forEach(tab => {
        tab.addEventListener('click', ()=>{
            const target = document.querySelector(tab.dataset.target)

            tabContent.forEach(tabContents => {
                tabContents.classList.remove('skills__active')
            })

            target.classList.add('skills__active')

            tabs.forEach(tab => {
                tab.classList.remove('skills__active')
            })

            tab.classList.add('skills__active')
        })
      })

      ctabs.forEach(ctab => {
        ctab.addEventListener('click', ()=>{
            const ctarget = document.querySelector(ctab.dataset.ctarget)

            ctabContent.forEach(ctabContents => {
                ctabContents.classList.remove('cate__active')
            })

            ctarget.classList.add('cate__active')

            ctabs.forEach(ctab => {
                ctab.classList.remove('cate__active')
            })

            ctab.classList.add('cate__active')
        })
      })

      /**==========  Skill Bar Effect  =========== */

      document.addEventListener('DOMContentLoaded', () => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percentages = entry.target.querySelectorAll('.skills__percentage');
                    percentages.forEach(percentage => {
                        // Set the width to trigger the CSS transition
                        percentage.style.width = percentage.getAttribute('data-width');
                    });
                    // Stop observing once animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger animation when 10% of the element is visible
        });
    
        const skillBars = document.querySelectorAll('.skills__bar');
        skillBars.forEach(bar => {
            // Set data-width attribute from inline styles
            const percentage = bar.querySelector('.skills__percentage');
            percentage.setAttribute('data-width', percentage.style.width);
            percentage.style.width = '0'; // Reset width to 0 for animation
            observer.observe(bar);
        });
    });
    

      /* #######  MIXITUP FILTER  ######  */

      let mixerPortfolio = mixitup('.work__container',{
        selectors:{
            target: '.work__card'
        },
        animation:{
            duration: 300
        }
      })

      /* ######    Link active work   ###### */

      const linkWork = document.querySelectorAll('.work__item'),
            skills__viewbtn = document.querySelectorAll('.skills_viewbtn');

      function activeWork(){
        linkWork.forEach(l => l.classList.remove('active__work'))
        this.classList.add('active__work')
      }

      linkWork.forEach(l => l.addEventListener('click',activeWork))

      /*===========  Work Popup   ===========*/

      document.addEventListener('click', (e) => {
        if(e.target.classList.contains("work__button")){
            togglePortfolioPopup();
            portfolioItemDetails(e.target.parentElement)
        }
      })

      function togglePortfolioPopup(){
        document.querySelector('.portfolio__popup').classList.toggle('open');
      }

      document.querySelector('.portfolio__popup-close').addEventListener('click',togglePortfolioPopup)
      

      function portfolioItemDetails(portfolioItem){
        document.querySelector('.pp__thumbnail img').src = portfolioItem.querySelector('.work__img').src;
        document.querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioItem.querySelector('.work__title').innerHTML;
        document.querySelector(".portfolio__popup-body").innerHTML = portfolioItem.querySelector('.portfolio__item-details').innerHTML;
      }

      /*==========    Cert Popup    ===========*/

      document.addEventListener('click', (e)=>{
        if(e.target.classList.contains('cert__button')){
          toggleCertPopup();
          CertItemDetails(e.target);
        }
      })

      document.querySelectorAll('.show__cert img').forEach(img => {
        img.addEventListener('click',()=>{
          window.location = img.src;
        })
      })

      function toggleCertPopup(){
        document.querySelector('.show__cert').classList.toggle('open__cert');
      }

      document.querySelector('.cert__close').addEventListener('click',toggleCertPopup)

      function CertItemDetails(CertItem){
        document.querySelector('.cert__img img').src = CertItem.querySelector('.cert img').src;
        document.querySelector('.show__cert .cert__title').innerHTML = CertItem.querySelector('.cert .description').innerHTML + " Cert";
        document.querySelector('.show__cert .cert__des').innerHTML = CertItem.querySelector('.cert__credentials .cert__description').innerHTML;
        document.querySelector('.show__cert .cert__comDate').innerHTML = CertItem.querySelector('.cert__credentials .cert__date').innerHTML;
        document.querySelector('.show__cert .ass__company').innerHTML = CertItem.querySelector('.cert__credentials .cert__ass').innerHTML;
      }

      /**======== Input Animation ======== */

      const inputs = document.querySelectorAll('.input');

      function focusFunc(){
        let parent = this.parentNode;
        parent.classList.add('focus');
      }

      function blurFunc(){
        let parent = this.parentNode;
        if(this.value == ""){
          parent.classList.remove('focus');
        }
      }

      inputs.forEach((input) => {
        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur",blurFunc);
      })

      /* =========  SCROLL SECTIONS ACTIVE LINK ========= */

      const navMenu = document.querySelector('.sidebar'),
            navToggle = document.querySelector('.nav__toggle'),
            navClose = document.querySelector('.nav__close'),
            sections = document.querySelectorAll("section[id]");

      window.addEventListener("scroll", navHighlighter);

      function navHighlighter()
      {
        // get current scroll position
        let scrollY = window.pageYOffset;

        // Now we loop through sections to get height,top and ID values for each
        sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 50;
          const sectionId = current.getAttribute('id');
        
          // Log sectionId and the selector
          const selector = '.nav__menu a[href*=' + sectionId + ']';
        
          // Check if the element exists
          const navLink = document.querySelector(selector);
          if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              navLink.classList.add("active-link");
            } else {
              navLink.classList.remove("active-link");
              navMenu.classList.remove('show__sidebar');
            }
          } else {
            console.warn('No element found for selector:', selector);
          }
        });
        
      }

      if(navToggle){
        navToggle.addEventListener("click", ()=>{
          navMenu.classList.add('show__sidebar')
        })
      }

      if(navClose){
        navClose.addEventListener("click", ()=>{
          navMenu.classList.remove('show__sidebar')
        })
      }


        /** Preventing contact form submission */

document.querySelector('.contact__form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    
    fetch('https://formspree.io/f/mgvwyyak', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('form-message').textContent = 'Your message has been sent successfully!';
        document.querySelector('.contact__form').reset(); // Optionally reset the form
    })
    .catch(error => {
        document.getElementById('form-message').textContent = 'There was a problem with your submission.';
        console.error('Error:', error);
    });
});
      /** ########    Formspree   ######## */

  /* customize formbutton below*/     
  formbutton("create", {
    action: "https://formspree.io/f/mgvwyyak",
    fields: [
      { 
        type: "text", 
        label: "Username:", 
        name: "username",
      },
      { 
        type: "email", 
        label: "Email:", 
        name: "email",
      },
      { 
        type: "tel",
        label: "Phone :", 
        name: "phone",
      },
      {
        type: "textarea",
        label: "Message :",
        name: "message",
        required: true,
      },
      { type: "submit" }
    ],
  });
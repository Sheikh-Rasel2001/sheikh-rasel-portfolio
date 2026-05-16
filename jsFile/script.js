const menuBtn = document.getElementById('menu-btn');
const menuItem = document.getElementById('menu-item');

let isOpen = false;

menuBtn.addEventListener('click', () => {
    menuItem.classList.toggle('-translate-x-full')
    menuItem.classList.toggle('translate-x-0')
    isOpen = !isOpen

    const menuItems = menuItem.querySelectorAll('li')

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItem.classList.remove('translate-x-0')
            menuItem.classList.add('-translate-x-full')
            isOpen = false
        })
    })

})

// typed animation
const words = [
    "Web Developer",
    "Frontend Developer",
    "React Developer",
]

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typedText = document.getElementById('typed-text');

function typeEffect() {
    const currentWord = words[wordIndex]
    if (isDeleting) {
        typedText.textContent = currentWord.substring(0, charIndex--)
    }
    else {
        typedText.textContent = currentWord.substring(0, charIndex++)
    }
    let speed = isDeleting ? 80 : 150;
    if (!isDeleting && charIndex === currentWord.length + 1) {
        speed = 1500;
        isDeleting = true;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeEffect, speed)
}
typeEffect();

// count up animation

const startCount = (el) => {
    const target = +el.getAttribute('data-target');
    const increment = target / 100;
    let count = 0;

    const update = () => {
        count += increment;
        if (count < target) {
            el.innerText = Math.ceil(count);
            setTimeout(update, 20)
        }
        else {
            el.innerText = target;
        }
    }
    update();
}

// --- Intersection Observer for Stats ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(c => startCount(c))
            observer.unobserve(entry.target)
        }
    })
}, { threshold: 0.5 })

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    const statsSection = document.querySelector('.counter')?.parentElement?.parentElement;
    if (statsSection) observer.observe(statsSection);
});

// project card
const container = document.getElementById('card-container');
fetch('../data/projects.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(project => {
            const card = document.createElement('div');
            card.innerHTML = `
        <div class="w-full bg-gray-700 rounded-lg border border-gray-500 flex flex-col h-full">
                    <div class="w-full h-56 rounded-lg mb-6">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover rounded-t-lg">
                    </div>
                   
                     <div class="p-6">
                        <h1 class="text-3xl text-purple-200 font-bold hover:text-purple-500 mb-4 transition-all duration-300 transform">${project.title}</h1>
                        <p class="text-gray-400 mb-6 text-sm">${project.description}</p>
                        <div class="flex flex-wrap justify-center items-center gap-4 mb-6">
                            ${project.tags.map(tag => `<span class='px-2 py-1 border border-purple-600 rounded-lg text-purple-100 hover:bg-purple-600 transition-all duration-300 transform'>${tag}</span>`).join('')}
                        </div>
                        <div class="flex justify-between items-center">
                            <a class="px-4 py-2 rounded-lg text-white font-semibold text-lg bg-purple-600 hover:bg-purple-800 transition-all duration-300 transform" href="${project.demoLink}" target="_blank">Demo</a>
                            
                            <a class="px-4 py-2 rounded-lg text-white font-semibold text-lg border border-purple-600 hover:bg-purple-800 transition-all duration-300 transform" href="${project.codeLink}" target="_blank">Code</a>
                        </div>

                     </div>
                </div>
        `
            container.appendChild(card)
        })
    })

// skills bar 
const bars = document.querySelectorAll('.skill-bar');

window.addEventListener('load', () => {
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1.5s ease';
        }, 300)
    })
})
// service id = service_3rmrjpl
// public key = _PZDHU1v43imM0x_A
// template key = template_g8aqep8

// contact form submit
emailjs.init("_PZDHU1v43imM0x_A");
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const serviceId = 'service_3rmrjpl';
    const templateId = 'template_g8aqep8';

    const templateParams = {
        user_name : document.getElementById('form_name').value,
        user_email : document.getElementById('form_email').value,
        name : document.getElementById('form_name').value,
        message : document.getElementById('user_message').value
    };

    emailjs.send(serviceId, templateId, templateParams)
    .then(function () {
        alert('Message Sent Successfully');
        document.getElementById('contact-form').reset()
    })
    .catch(function (error) {
        console.log("FAILED...", error);
        alert('Failed to sent message. Please try again');
    })

})

// footer year
document.getElementById('year').textContent = new Date().getFullYear();
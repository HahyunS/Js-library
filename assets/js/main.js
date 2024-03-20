import Glide from "../../../node_modules/@glidejs/glide/dist/glide.esm.js";
import { map, tileLayer, marker } from "../../../node_modules/leaflet/dist/leaflet-src.esm.js";

// glide js
const glideMulti = new Glide('.multi', {
  type: 'carousel',
  autoplay: 3500,
  perView: 6,
});

glideMulti.mount();

// Leaflet
const leafletMap = map("map").setView([51, -114], 10)

tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(leafletMap);
var mapMarker = marker([43.653226, -79.3831843]).addTo(leafletMap);
mapMarker.bindPopup("<b>We are here!</b><br>LumoCozy").openPopup();

// AOS
AOS.init({
  duration: 1200,
});

// choreographer-js
var wrapperNode = document.querySelector('#wrapper')
var vh = window.innerHeight;
var fin = wrapperNode.clientHeight - vh;

function calculateAnimations() {
  return [
    /* animate Ls */
    { range: [-1, fin * 0.5],   selector: '.l', type: 'scale', style: 'transform:translateY', from: 0, to: 25, unit: 'px' },
    { range: [fin * 0.5, fin],  selector: '.l', type: 'scale', style: 'transform:translateY', from: 25, to: 0, unit: 'px' },
    { range: [fin * 0.4, fin],  selector: '.l', type: 'change', style: 'color', to: '#8c5637' },

    /* animate Us */
    { range: [-1, fin * 0.5],   selector: '.u', type: 'scale', style: 'transform:scaleX', from: 1, to: 0.5 },
    { range: [-1, fin * 0.5],   selector: '.u', type: 'scale', style: 'transform:scaleY', from: 1, to: 0.5 },
    { range: [fin * 0.5, fin],  selector: '.u', type: 'scale', style: 'transform:scaleX', from: 0.5, to: 1 },
    { range: [fin * 0.5, fin],  selector: '.u', type: 'scale', style: 'transform:scaleY', from: 0.5, to: 1 },
    { range: [fin * 0.3, fin],  selector: '.u', type: 'change', style: 'color', to: '#d9d0c7' },

    /* animate Os */
    { range: [fin * 0.1, fin],  selector: '.o', type: 'change', style: 'color', to: '#bfa98e' },

    /* animate Ms */
    { range: [-1, fin * 0.5],   selector: '.m', type: 'scale', style: 'transform:rotateX', from: 0, to: 90, unit: 'deg' },
    { range: [fin * 0.5, fin],  selector: '.m', type: 'scale', style: 'transform:rotateX', from: 90, to: 0, unit: 'deg' },
    { range: [fin * 0.3, fin],  selector: '.m', type: 'change', style: 'color', to: '#a67f68' },

    /* animate Cs */
    { range: [-1, fin * 0.5],   selectors: ['.c'], type: 'scale', style: 'transform:rotateZ', from: 0, to: -180, unit: 'deg' },
    { range: [fin * 0.5, fin],  selectors: ['.c'], type: 'scale', style: 'transform:rotateZ', from: -180, to: -360, unit: 'deg' },
    { range: [fin * 0.3, fin],  selector: ['.c'], type: 'change', style: 'color', to: '#592816' },

    /* animate Zs */
    { range: [-1, fin * 0.5],   selectors: ['.z'], type: 'scale', style: 'transform:rotateZ', from: 0, to: 180, unit: 'deg' },
    { range: [fin * 0.5, fin],  selectors: ['.z'], type: 'scale', style: 'transform:rotateZ', from: 180, to: 360, unit: 'deg' },
    { range: [fin * 0.4, fin],  selectors: ['.z'], type: 'change', style: 'color', to: '#caa78a' },

    /* animate Ys */
    { range: [-1, fin * 0.5],   selectors: ['.y'], type: 'scale', style: 'transform:rotateZ', from: 0, to: -180, unit: 'deg' },
    { range: [fin * 0.5, fin],  selectors: ['.y'], type: 'scale', style: 'transform:rotateZ', from: -180, to: -360, unit: 'deg' },
    { range: [fin * 0.4, fin],  selectors: ['.y'], type: 'change', style: 'color', to: '#947960' },

    /* animate line */
    { range: [-1, fin],         selector: '.line', type: 'scale', style: 'width', from: 0.01, to: 50, unit: '%' },
    { range: [-1, fin],         selector: '.line', type: 'scale', style: 'opacity', from: 0, to: 1 },
  ]
}

// Instantiate choreographer.
var choreographer = new Choreographer({
  animations: calculateAnimations(),
  customFunctions: {
    randomizeColor: function(data) {
      var chars = '0123456789abcdef'.split('');
      var hex = '#';

      while (hex.length < 7) {
        hex += chars[Math.round(Math.random() * (chars.length - 1))];
      }

      data.node.style.color = hex;
    }
  }
})

function animate() {
  var scrollPosition = (wrapperNode.getBoundingClientRect().top - wrapperNode.offsetTop) * - 1;
  choreographer.runAnimationsAt(scrollPosition);
}

document.addEventListener('scroll', animate);

animate();

window.addEventListener('resize', function() {
  choreographer.updateAnimations(calculateAnimations());
})

// mobile side navigation
const menuButton = document.querySelector('#menu-button');
const closeButton = document.querySelector('.close-button');
const sideNav = document.querySelector('#side-nav');

menuButton.addEventListener('click', function() {
  sideNav.style.width = "250px";
});

closeButton.addEventListener('click', function() {
  sideNav.style.width = "0";
});

// eslint-disable-next-line strict
'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'mdn-polyfills/Node.prototype.append';
import 'date-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import sliderCarousel from './modules/sliderCarousel';
import littleThings from './modules/littleThings';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Таймер
countTimer('01-01-2021 00:00:00');

//Меню
toggleMenu();

//popup
togglePopUp();

//табы
tabs();

//слайдер
slider();

//слайдер карусель, подключение с отдeльного файла
sliderCarousel();

//работа с мелькими вещами
littleThings();

//калькулятор
calc(1000);

//send-ajax-form
sendForm();

import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, state
} from '@angular/animations';

export const SimpleFadeAnimation = trigger('SimpleFadeAnimation', [

    // the "in" style determines the "resting" state of the element when it is visible.
    //state('in', style({ opacity: 1 })),

    // fade in when created.  this could also be written as transition('void => *')
    transition(':enter', [
        style({ opacity: 0 }),
        animate(400)
    ]),

    // fade out when destroyed.  this could also be written as transition('void => *')
    transition(':leave',
        animate(400, style({ opacity: 0 })))
])

export const SlideinAnimation = trigger('SlideinAnimation', [
    transition(':enter', [
        style({ transform: 'translateY(30px)' }),
        animate(300)
    ])
])
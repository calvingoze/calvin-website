import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, state, stagger
} from '@angular/animations';

export const SimpleFadeAnimation = trigger('SimpleFadeAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(400)
    ]),
    transition(':leave',
        animate(400, style({ opacity: 0 })))
])

export const SlideinAnimation = trigger('SlideinAnimation', [
    transition(':enter', [
        style({ transform: 'translateY(30px)' }),
        animate(300)
    ])
])

export const ListAnimation = trigger('ListAnimation', [
    transition(':enter', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(100, [
                animate('0.4s', style({ opacity: 1, transform: 'translateY(0px)' }))
            ])
        ])
    ])
])
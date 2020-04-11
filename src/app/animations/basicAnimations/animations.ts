import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, state, stagger, sequence
} from '@angular/animations';

export const SimpleFadeAnimation = trigger('SimpleFadeAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(400)
    ]),
    transition(':leave',
        animate(400, style({ opacity: 0 })))
])

export const SendOffAnimation = trigger('SendOffAnimation',[
    transition(':leave',sequence([
        animate("200ms ease", style({ transform: 'scale(0.7)' })),
        animate(50,style({ transform: 'scale(0.7)' })),
        animate("200ms ease", style({ opacity: 0, transform: 'translateY(-300px) scale(0.7)'}))
    ])),
]);

export const SlideinAnimation = trigger('SlideinAnimation', [
    transition(':enter', [
        style({ transform: 'translateY(30px)' }),
        animate("400ms ease")
    ])
])

export const ListAnimation = trigger('ListAnimation', [
    transition(':enter', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(100, [
                animate('0.4s ease', style({ opacity: 1, transform: 'translateY(0px)' }))
            ])
        ])
    ])
])
import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, sequence } from '@angular/animations';
import { ContentBlock } from 'src/app/models/ContentBlock';
import { SlideinAnimation, SimpleFadeAnimation } from '../../animations/basicAnimations/animations';
import { Skill } from 'src/app/models/Skill';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    SimpleFadeAnimation,
    SlideinAnimation,
    trigger('TitleSequnce',[
      transition('void => name',[
        style({ opacity: 0 ,transform: 'translateY(-20px)'}),
        animate("400ms ease", style({ opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition('void => competent',sequence([
        animate(0,style({ opacity: 0 })),
        animate("400ms ease", style({ opacity: 0 , transform: 'translateX(-50px)'})),
        animate("400ms ease", style({ opacity: 1, transform: 'translateX(0px)'}))
      ])),
      transition('void => committed',sequence([
        animate(0,style({ opacity: 0 })),
        animate("400ms ease", style({ opacity: 0 , transform: 'translateX(50px)'})),
        animate("400ms ease", style({ opacity: 1, transform: 'translateX(0px)'}))
      ])),
      transition('void => arrow',sequence([
        animate(0,style({ opacity: 0 })),
        animate("800ms ease", style({ opacity: 0 , transform: 'rotate(180deg) translateY(-40px)'})),
        animate("500ms ease", style({ opacity: 1, transform: 'translateY(0px)'}))
      ]))
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor( ) { }

  techSkills: Array<Skill>
  langSkills: Array<Skill>
  headContent: ContentBlock;
  isMobile: boolean = false;
  mobileHeight: string;

  ngOnInit(): void {
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        document.getElementById("hero-img").style.height = window.innerHeight - 248 + "px";
        document.getElementById("hero-img").style.backgroundImage = 'url("https://firebasestorage.googleapis.com/v0/b/calvinwebsite-7228e.appspot.com/o/Static_Images%2Fhome-hero-mobile.jpg?alt=media&token=7fbdbd08-6420-44c4-b371-cdcfc2e7662a")';

    } else {
      document.getElementById("hero-img").style.backgroundImage = 'url("https://firebasestorage.googleapis.com/v0/b/calvinwebsite-7228e.appspot.com/o/Static_Images%2Fhome-hero.jpg?alt=media&token=28ac1121-c82a-463e-9647-79b29e784c07")';
    }
    this.techSkills = [
      {
        name: "Angular",
        logoUrl: "/assets/skillLogos/angular.png",
        blog: "angular"
      },
      {
        name: "ASP.NET MVC",
        logoUrl: "/assets/skillLogos/net.png"
      },
      {
        name: "Bootstrap",
        logoUrl: "/assets/skillLogos/bootstrap.svg"
      },
      {
        name: "DNN",
        logoUrl: "/assets/skillLogos/dnn.png"
      },
      {
        name: "jQuery",
        logoUrl: "/assets/skillLogos/jquery.png"
      },
      {
        name: "MATLAB®",
        logoUrl: "/assets/skillLogos/matlab.png",
        blog: "matlab"
      },
      {
        name: "Microsoft Excel",
        logoUrl: "/assets/skillLogos/excel.png"
      }
    ]

    this.langSkills = [
      {
        name: "C#",
        logoUrl: "/assets/skillLogos/cs.png"
      },
      {
        name: "CSS",
        logoUrl: "/assets/skillLogos/css.png"
      },
      {
        name: "HTML",
        logoUrl: "/assets/skillLogos/html.png"
      },
      {
        name: "JavaScript",
        logoUrl: "/assets/skillLogos/js.png"
      },
      {
        name: "TypeScript",
        logoUrl: "/assets/skillLogos/ts.png"
      },
    ]
  }
  ScrollToContent(){
      document.getElementById("down-button").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}

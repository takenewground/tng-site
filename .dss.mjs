import { writeFile } from 'fs/promises';
import '../dss/dss.js';
dss.init();
dss.install(dss.plugin_from_obj({
    async install() {
        await dss.install_paths([
            `${dss.DIR}/plugins/css/index.js`,
            // "/plugins/clr.js",
            `${dss.DIR}/plugins/typ.js`,
            // "/plugins/prose/index.js"
        ])
    },
    async configure() {
        const {set,set_multi_band,set_merge} = dss;
        
        set('xxs',320)      // 200 'xxs' Mobile portait (320px to 414px) — For devices with 4" to 6.9" screens.
        set('xs',480)       // 300 'xs' Mobile landscape
        set('sm',640)       // 400 'sm'
        set('md',768)       // 500 'md' Tablet-portrait (and larger)
        set('lg',992)       // 600 'lg' Tablet-landscape (and larger) // 'lg': '1024px',
        set('xl',1200)      // 700 'xl' // Laptops (and langer)
        set('xxl',1800)     // 800 'xxl' ... or 1920 '1536px' '2xl'
        set('xxxl',2400)    // 900 'xxxl'
        // dark fg
        set_multi_band('clr.dark.fg', {
            range: [100, 900], step: 100, default: 500,
            props: [
                ['h', ()=> 219],
                ['s', ()=> '25%'],
                ['l'],
                ['a'],
            ]
        });
        set_merge('clr.dark.fg.100', {l: '87%', a:0.2});
        set_merge('clr.dark.fg.400', {l: '87%', a:0.6});
        set_merge('clr.dark.fg.500', {l: '87%', a:1.0});
        set_merge('clr.dark.fg.700', {l: '93%', a:1.0});
        set_merge('clr.dark.fg.900', {l:'100%', a:1.0});
        // dark bg
        set_multi_band('clr.dark.bg', {
            range: [100, 900], step: 100, default: 500,
            props: [
                ['h'],
                ['s', ()=> '25%'],
                ['l'],
                // ['a', band.const(1.0)],
            ]
        });
        set_merge('clr.dark.bg.100', {h:225, s:'13%', l:  '0%'}),
        set_merge('clr.dark.bg.300', {h:225, s:'13%', l: '12%'}),
        set_merge('clr.dark.bg.400', {h:234, s:'13%', l: '15%'}),
        set_merge('clr.dark.bg.500', {h:240, s:'10%', l: '18%'}),
        set_merge('clr.dark.bg.600', {h:220, s: '6%', l: '22%'}),
        set_merge('clr.dark.bg.700', {h:230, s: '8%', l: '26%'}),
        set_merge('clr.dark.bg.900', {h:230, s:'7%', l:'29%'}),
        // pop colors
        set_merge('clr.pop1', {h:116, s: '32%', l: '64%'}); /*green*/
        set_merge('clr.pop2', {h: 40, s:'100%', l: '75%'}); /*yellow*/
        set_merge('clr.pop3', {h:194, s: '94%', l: '51%'}); /*blue*/
        set_merge('clr.pop4', {h:248, s: '59%', l: '63%'}); /*purp*/
        set_merge('clr.pop5', {h:340, s:'100%', l: '84%'}); /*pink*/
        //  $.set_merge('clr.pop_100', {h:194, s: 94, l:100}); /*white*/
    },
    make() {
        const {get} = dss;
        const css = get("/css");
        // const prose = get("/prose");
        const out = css.flatten([
            css.make_all(),
            // prose.make_css(),
            app_css()
        ]);
        // console.log(css.mixin('flex-v', ['gap',css.rlh(1)] ))
        writeFile("./src/css/base.css", css.beautify(out))
        // console.log(css.beautify(out));

        // css.mixin("color-dodge","mixin-blend-mode:color-dodge;");

        function app_css()
        {
            const $ = css.class;
            return  css.flatten([
                ['body',`
                    --color-text: #fff;
                    --color-bg: #1e2227;
                    --color-bg: #2b2b2b;
                    --color-bg: hsl(0 0% 0%);
                    --color-bg-shift:  #e1ddd8;
                    --main-bg: hsl(0deg 0% 23%);
                    --card-bg: hsl(0deg 0% 30%);

                    --color-link: #fff;
                    --color-link-hover: #fff;

                    color: var(--color-text);
                    background-color: var(--color-bg);

                    font-family: 'Aktiv Grotesk', Nexa Text, brother-1816, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    font-size: 2.5vh;

                `,
                    `--text-scale: 1.0;`,
                    [css.media('xl'), `--text-scale: 1.3333333;`],
                    [css.media('lg'), `--text-scale: 1.6666666;`],
                    [css.media('md'), `--text-scale: 2.0000000;`],
                    [css.media('sm'), `--text-scale: 2.3333333;`],
                    [css.media('xs'), `--text-scale: 2.6666666;`],
                    `
                    --rfs: 0.938vh;
                    --rlh: calc(var(--rfs) * 1.875 / 0.938);
                    font-weight: 500;
                    font-size: calc((1.6666666vh + 1.0w) / 2 * var(--text-scale));
                    line-height: 1.6666666;
                    letter-spacing: .1ch;
                    `
                ],
                `
                .marquee {
                    margin: 2rem 0;
                    left:0;
                    overflow: hidden;
                    
                    font-size: calc((16vh + 16vw) / 2);
                    font-family: Saol Display, ivypresto-display, serif;
                            font-style: italic;
                            font-weight: 600;                            
                            line-height: 1.1111111;
                            letter-spacing: -0.05ch;
                            pointer-events: none;
                 }
                 .marquee > span {   
                     display: inline-block;
                     white-space: nowrap;                     
                     width: var(--tw);
                     text-shadow: var(--tw) 0 currentColor, 
                                  calc(var(--tw) * 2) 0 currentColor;
                                  /*calc(var(--tw) * 4) 0 currentColor;*/
                    
                     will-change: transform; transform: translate3d(0,0,0);
                     animation: marquee var(--ad) linear infinite;
                     animation-play-state: running;
                 }
                 .marquee:hover span {
                     animation-play-state: paused;
                 }
                 @keyframes marquee {
                     0% { transform: translate3d(0,0,0); }
                     100% { transform: translate3d(-100%,0,0); }
                 }
                `,
                // ['html.pleaserotate-showing',`overflow:hidden !important;`,
                // ],
                // ['#pleaserotate-message',$`text-center m.t(1em)`,`
                //     font-family: Saol Display, ivypresto-display, serif;
                //     font-weight: 500;
                //     font-size: 12vw;
                //     line-height: 1.1111111;
                //     letter-spacing: -0.05ch;
                // `,
                //     ['small', $`block m.y(3em)`, `
                //     font-weight: bold;
                //     font-size: 3vw;
                //     line-height: 2;
                //     letter-spacing: 2ch; marging-left: 2ch;
                //     text-transform: uppercase;
                //     font-family: 'Aktiv Grotesk';
                //     `]
                // ],
                ['.layer',$`fixed t(0) l(0) `],
                ['a',$`color(${css.v('color-link')}) cursor(pointer)
                    textline-under textline-dotted textline.color(black) textline.h(.11em) textline.y(.33333333em)
                `,
                    ['&:hover',$`textline-solid`],
                ],
                ['p',$`w.max(64ch)`,
                    ['&.lead',
                    // font-size: var(--rlh);
                    `
                        -webkit-hyphens: auto;
	                    hyphens: auto;
                    `],
                ],
                ['h3', $`relative`, `
                            font-weight: bold;
                            font-size: calc(0.77777777vw * var(--text-scale));
                            line-height: 1em;
                            letter-spacing: 1.5ch;
                            text-indent: 1.5ch;
                            text-transform: uppercase;
                            font-family: 'Aktiv Grotesk';
                            --line-w: 1px;
                        `,
                        ['&:before', `
                            content: "";
                            position: absolute;
                            display: block;
                            width: 100%;
                            height: 100%;
                            top: -250%;

                            border-bottom: var(--line-w) solid hsl(0deg 0% 0%);
                            border-top: var(--line-w) solid hsl(0deg 0% 0%);
                            transform: skewX(70deg);
                            transform-origin: 0% 0%;
                        `],
                        ['&:after', `
                            content: "";
                            position: absolute;
                            display: block;
                            width: 100%;
                            height: 100%;
                            top: 250%;
                            border-bottom: var(--line-w) solid hsl(0deg 0% 0%);
                            border-top: var(--line-w) solid hsl(0deg 0% 0%);
                            transform: skewX(70deg);
                            transform-origin: 100% 100%;
                        `],
                ],

                ['[data-scroll-container].is-scrolling',
                    `will-change:transform;`,
                    // ['[data-scroll-section], [data-scroll], .c-scrollbar_thumb',`will-change:transform;`],
                    // ['[data-scroll-container]',`will-change:transform;`],
                    ['[data-scroll-section], [data-scroll], .c-scrollbar_thumb',`will-change:transform;`],
                ],


                ['.mix-blend',`mix-blend-mode:exclusion;`],

                ['.bg',`
                        background: var(--color-bg);
                        position: fixed;
                        top: 0;
                        height: 100%;
                        width: 100%;
                        pointer-events: none;
                `],

                ['#main-wrap',$`bg(${css.v('main-bg')}) contain(style)`],
                ['main',$`flex-v contain(${`style paint`}) backface-hidden style(${`
                    transform:translate3d(0px,0px,0px);
                `})`],

                // defaults
                ['section', $`contain(style) flex-v`,// $`bg(${css.v('section-bg')})`,
                    ['>.area', 
                        $`w(100vw) h(100%) m(auto) flex-v gap(${css.vh(100/18)}) p.y(${css.vh(100/9)})`,                        
                        
                        // $`p.x(0)`,
                        $`p.x(${css.vh(100/7)}) w.max(2400px)`,
                        [css.media('xxl'),  $`p.x(${css.vh(100/8)})`],
                        [css.media('xl'),   $`p.x(${css.vh(100/9)})`],
                        [css.media('lg'),   $`p.x(${css.vh(100/12)})`],
                        [css.media('md'),   $`p.x(${css.vh(100/15)})`],
                        [css.media('sm'),   $`p.x(${css.vh(100/18)})`],
                        [css.media('xs'),   $`p.x(${css.vh(100/21)})`],
                        [css.media('xxs'),  $`p.x(${css.vh(100/24)})`],
                    ]                    
                ],

                ['section', $`flex p.t(${css.vh(100/9)})`,
                    ['>.area',
                        ['.title h1',`
                            font-family: Saol Display, ivypresto-display, serif;
                            font-weight: 600;
                            font-size: calc((8vh + 8vw)/2);
                            line-height: 1.1111111;
                            letter-spacing: -0.131vw;
                            pointer-events: none;
                        `]
                    ],
                    ['.cards',$`grid grid-cols-3 w(100%) gap(${css.vw(100/72)})`,
                        [css.media('lg'),   $`grid-cols-2 gap(${css.vh(100/18)})`],
                        [css.media('md'),   $`flex-v gap(${css.vh(100/18)})`],
                    ],
                    ['.card',$`p(${css.vw(100/36)}) flex-v`, 
                        [css.media('md'),   $`p(${css.vh(100/18)})`],
                    `                        
                        background: var(--card-bg);
                        flex: 1;
                        box-shadow: 0 1px 2px hsl(0deg 0% 0% / 31%), 0 4px 8px hsl(0deg 0% 0% / 27%), inset 0 1px 1px hsl(0deg 0% 100% / 9%);
                        transition: box-shadow .75s .1s, background-color .75s .1s; 
                    `, // border: 1px solid black;
                        ["&:hover",`
                            box-shadow: none;
                            background: hsl(0 0% 10%);
                        `],
                        ['> *',`pointer-events: none;`],
                        ['h2',`
                            text-transform: uppercase;
                            font-size: .88888rem;
                            letter-spacing: .33333ch;
                            opacity: .5;
                        `],
                        ['h4', $`m.b(auto) m.t(1rem)`,`                            
                            font-family: Saol Display, ivypresto-display, serif;
                            font-weight: 900;
                            font-size: calc((4vh + 4vw)/2);
                            line-height: 1.1111111;
                            letter-spacing: 0vw;
                            pointer-events: none;
                        `],
                        ['p',$`m.t(4em) m.b(8em)`,`
                            opacity: .5;
                        `]
                    ]          
                ],
                

                ['section.intro', $`relative h(100vh)`,
                    ['.graphic',$`flex-h zi(-1) bg(black) absolute t(0) l(0) w(100vw) h(100vh)`,//$`m.b(${css.vh(0/9)})`,
                        // [css.media('md'),$`col.start(6) col.end(10) row.start(1) row.end(10) m.b(${css.vh(-100/9)}) m.r(${css.vw(-100/18)})`],
                        ['.graphic-item', $`w(100%) block bg.size(cover) bg.position(${'50% 50%'})`,`
                            object-fit: cover;
                            object-position: 50% 50%;
                            opacity: .5;
                        `],
                    ],
                    ['.title', $`h(100%)
                        flex-v gap(6vw) items-center justify-between
                        uppercase text-center`,`
                        text-transform: uppercase;
                        text-align:center;
                        `,
                        ['.logo',$`h.min(6vw) flex items-center `,`                            
                            max-width: calc((100vh+100vw)/12);
                        `], //flex:0;
                        ['.title-main',$`style(${`
                            font-family: Saol Display, ivypresto-display, serif;
                            font-weight: 600;
                            font-size: calc( 3vh + 3vw);
                            line-height: 1.1111111;
                            letter-spacing: -0.01ch;
                            pointer-events: none;
                        `})`],
                    ],
                    ['> .social-links',
                        // $`col.start(3) col.end(6) row.start(8) row.end(auto) flex-v items-center text-center
                        $`col.start(8) col.end(10) row.start(1) row.end(auto) flex-v items-center text-center
                            gap(1.6666666vw)
                            none`,
                        // $`col.start(3) col.end(6) row.start(9) row.end(auto) flex-h items-end content-between gap(2em) text-center`,
                        // ['>a',$`w.max(9em)`],
                    ],
                ],

                // ['section.process-cards', $`flex p.t(${css.vh(100/9)})`,                   
                //     ['.card > img', `width:50%; align-self:`],
                // ],

                ['section.quote',$`relative`,
                    ['.figure-blockquote',$`flex-v items-end m.b(${css.vh(100/9)})`,
                        ['>blockquote',$`order(0) m.x(${css.vw(100/36)}) m.y(1rem) style(${`
                            font-family: Saol Display, ivypresto-display, serif;
                            font-weight: 700;
                            font-size: calc((4vh + 4vw)/2);
                            line-height: 1.1111111;
                            letter-spacing: 0;
                            pointer-events: none;
                        `})`],
                        ['>figcaption',$`order(1) flex-v items-end gap(1rem) p(1.11111111rem) 
                            text-right
                        `, // m.t(${css.vh(100*2/9)})                            
                            ['.author-meta', $`style(${`font-weight: 600; opacity:.5;`})`],
                            ['.avatar', $`w(10rem) h(10rem) rounded(0) block `, `
                                object-fit: cover;
                            `],
                        ],

                    ],
                ],

                ['section.profile-list',$`relative`,
                    ['>.area',$`grid grid-cols-3`,
                        // [css.media('lg'),   $`flex-v`],
                        [css.media('lg'),   $`grid-cols-2`],
                    ],
                    ['.title',`grid-column-start:1;`,
                        [css.media('lg'),   `grid-column-end:2;`],
                    ],
                    
                    // ['.title h1',`white-space: nowrap;                        
                    //     pointer-events: none;
                    // `],
                    // ['ul',$`flex-h flex-wrap justify-items-stretch gap(4rem)`],
                    ['.item',$`flex-v w.min(40%) m.b(3rem)`,`flex:1;`,
                        [css.media('lg'),   $`w.min(80%)`],
                        
                        ['.role', $`style(${`font-weight: 600; opacity:.5;`})`],
                        ['.avatar', $`w(100%) rounded(0) block m.b(2rem)`, `
                            object-fit: contain;
                            aspect-ratio:1/1;
                        `],
                        ['.links', $`space.x(2ch) m.t(1.5em)`,`opacity:.6;`,
                            ['a', $`p.x(2ch) p.y(1ch)`,`background:black; color:white;`]
                        ],

                    ],
                ],

                ['section.outro',
                    $`relative h(100vh) p.t(0)
                        grid grid.cols(9) grid.rows(9)
                    `,
                    ['> .graphic',        $`col.start(2) col.end(5) row.start(3) row.end(10)
                        flex-h zi(-1)`,
                        [css.media('md'), $`col.start(1) col.end(5) row.start(3) row.end(10) m.l(${css.vh(-100/18)})`],
                        ['.graphic-item', $`w(100%) block rounded.t(999px) bg.size(cover) bg.position(${'50% 0%'})`],
                    ],
                    ['> .text',           $`col.start(6) col.end(8) row.start(4) row.end(auto)
                        flex-v gap(5vw) items-center`,
                        [css.media('md'), $`col.start(5) col.end(9) row.start(4) row.end(auto)`],
                    ],
                ],

                ['section.graphic-text',$`relative`,`
                    background: hsl(0 0% 100% / 0.6);
                    color: black;
                `,
                    ['>.area',$`flex-h h.min(100vh) gap(6rem)`,
                        [css.media('lg'),   $`flex-v`],
                    ],
                    // [css.media('lg'), $`h(111.11111vh) p.y(${css.vh(1/18)})`],
                    ['.graphic',        $`w(50%) h(auto) flex-h`,
                        // [css.media('lg'), $`col.start(1) col.end(4) row.start(1) row.end(6) m.b(${css.vh(-100/9)}) m.l(${css.vh(-100/18)})`],
                        ['.graphic-item', $`w(100%) block bg.size(contain) bg.repeat(none) bg.position(${'50% 50%'})`],
                    ],
                    ['.text',           $`w(50%) h(auto) justify-center flex-v gap(3rem)`,
                        // [css.media('lg'), $`col.start(5) col.end(9) row.start(6) row.end(auto)`],
                        ['h2',`
                            font-family: Saol Display, ivypresto-display, serif;
                            font-weight: 600;
                            font-size: calc((8vh + 8vw)/2);
                            line-height: 1.1111111;
                            letter-spacing: -0.231vh;
                            pointer-events: none;
                        `],
                        ['a', $`block p.x(3ch) p.y(1ch)`,`background:black; color:white;`]
                    ],
                ],
                // ['section.graphic-text',
                //     $`relative h(100vh) p.y(${css.vh(0/9)}) grid grid.cols(9) grid.rows(9)
                //     `,
                //     [css.media('lg'), $`h(111.11111vh) p.y(${css.vh(1/18)})`],
                //     ['> .graphic',        $`col.start(3) col.end(5) row.start(1) row.end(6) m.b(${css.vh(-100/9)})
                //         flex-h`,
                //         [css.media('lg'), $`col.start(1) col.end(4) row.start(1) row.end(6) m.b(${css.vh(-100/9)}) m.l(${css.vh(-100/18)})`],
                //         ['.graphic-item', $`w(100%) block bg.size(contain) bg.repeat(none) bg.position(${'50% 50%'})`],
                //     ],
                //     ['> .text',           $`col.start(6) col.end(8) row.start(6) row.end(auto)`,
                //         [css.media('lg'), $`col.start(5) col.end(9) row.start(6) row.end(auto)`],
                //     ],

                // ],

                ['section.graphic-text-alt',
                    $`relative h(100vh) p.y(${css.vh(0/9)})
                        grid grid.cols(9) grid.rows(9)
                `,
                ['> .graphic',        $`col.start(1) col.end(6) row.start(1) row.end(7) m.b(${css.vh(-100/9)})
                    flex-h`,
                    [css.media('lg'), $`col.start(1) col.end(4) row.start(1) row.end(7) m.b(${css.vh(-100/9)}) m.l(${css.vh(-100/18)})`],
                    ['.graphic-item', $`w(100%) block rounded.r(999px) bg.size(cover) bg.position(${'50% 50%'})`],
                ],
                ['> .text',           $`col.start(6) col.end(8) row.start(8) row.end(auto)`,
                    [css.media('lg'), $`col.start(5) col.end(9) row.start(6) row.end(auto)`],
                    $`relative`,
                    ['&::after',`
                        content: '';
                        position: absolute;
                        width: 88vw;
                        height: 88vw;
                        border: 1px solid #000;
                        border-radius: 50%;
                        left: 50%;
                        top: calc(-50% - 44vw);
                        margin-left: -44vw;
                    `]
                ],

            ],

                ['section.present', css.class`relative flex-v`, `
                        padding-top: 33.333333vh;
                        padding-bottom: 33.333333vh;
                        gap: 3.75vw;
                    `
                ],
                ['section.client-logos .area',                     
                    ['.cards',$`grid grid-cols-3  w(100%) gap(${css.vw(100/72)})`,
                        [css.media('xl'),   $`grid-cols-2 gap(${css.vh(100/18)})`],                        
                        [css.media('lg'),   $`grid-cols-2 gap(${css.vw(100/21)})`],
                        [css.media('md'),   $`grid-cols-2 gap(${css.vw(100/24)})`],
                        [css.media('sm'),   $`grid-cols-1 `],
                    ],
                ],
            ])
        }
    }
})).then(async ()=> {
    await dss.run('configure')
    await dss.run('make')
})

{/* <button class="intro__menu-button invert" aria-label="Open Menu">
					<svg width="100%" height="100%" viewBox="0 0 105 105">
						<circle fill="#25282a" cx="52.5" cy="52.5" r="52.5"/>
						<path class="lines" d="M40.5 46.208h25M40.5 52.208h25M40.5 58.208h25" stroke="#B7B7B7"/>
					</svg>
				</button> */}

// .intro__menu-button {
// 	align-self: start;
// 	justify-self: end;
// 	border: 0;
// 	margin-top: 1rem;
// 	background: none;
// 	cursor: not-allowed;
// 	width: 60px;
// 	height: 60px;
//     @media screen and (min-width: 53em)
//         width: 105px;
//         height: 105px;

// }


// @media screen and (min-width: 53em) {
// 	body {
// 		--page-padding: 1.5rem;
// 	}

// 	.lines {
// 		stroke-width: 2px;
// 	}



// 	.intro {
// 		grid-template-areas:
// 		'intro-images intro-menu'
// 		'intro-images intro-ad'
// 		'intro-title intro-title';
// 		grid-template-columns: 67% 1fr;
// 		grid-template-rows: 1fr 1fr auto;
// 	}

// 	.intro__title {
// 		/* white-space: nowrap; */
// 	}

// 	.demos {
// 		position: relative;
// 		width: auto;
// 	}

// 	.demos::before {
// 		content: '';
// 		width: 3rem;
// 		border-bottom: 1px solid;
// 		display: inline-block;
// 		vertical-align: middle;
// 		margin: 0 0.5rem;
// 	}

// 	.present {
// 		display: grid;
// 		grid-template-areas: 'present-large present-large''present-small present-visual';
// 		grid-template-columns: 40% 1fr;
// 	}

// 	.type__link {
// 		display: inline-block;
// 	}

// 	.footer {
// 		display: grid;
// 		grid-template-areas: 'footer-list footer-img ...''footer-author footer-img footer-year';
// 		grid-template-columns: auto 1fr auto;
// 		align-content: space-between;
// 	}

// 	.footer__links {
// 		column-count: 2;
// 	}
// }

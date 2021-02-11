"use strict";

$(document).ready(function() {
    // spinner handler
    setTimeout(() => $('.loader').addClass('hide'), 3000)
        //  introduction text 
    $('.starwars-main-container ').removeClass('hide')
    $('.crawl').css({ animationPlayState: 'running' });

    // remove everything on 1353px
    $(window).on('resize', function() {
        if ($(window).width() <= 1194) {
            $('#root').addClass('hide')
            $('.error').removeClass('hide')
            $('.image_received').addClass('hide')
        } else {
            $('#root').removeClass('hide');
            $('.error').addClass('hide')
            $('.image_received').removeClass('hide');
        }
    });


    // auto generate charactor profiles handler
    function generateXter() {
        // generate random number
        const random_number = () => Math.floor((Math.random() * 88) + 1);

        $.get(`https://akabab.github.io/starwars-api/api/id/${random_number()}.json`, async function(data) {
            const { id, image, height, homeworld, cybernetics, mass, born, skinColor, name, species, eyeColor, gender, affiliations } = await data;
            const [affiliate1, affiliate2, ...rest] = affiliations;

            $('.image_received img')
                .addClass('demo_image')
                .removeClass('hide').attr({ 'src': image }).animate({ 'opacity': .5, transition: '.4s' });

            // stop starwars animation on click
            $('.crawl').css({ 'animation-play-state': 'paused' });
            $('.starwars-main-container').animate({ opacity: '0', transition: '.5s' });
            setTimeout(() => {
                $('.starwars-main-container').remove();
                $('.head').css({ 'animation-play-state': 'running' });
            }, 2000)

            // data remder hadnler
            $('.details-main-container').removeClass('hide');
            // data collection in array
            const array_1 = [`ID: ${id}`, `Name: ${name}`, ` Birth: ${born}`, `Eye Color: ${eyeColor}`, `Gender: ${gender}`, `Home: ${homeworld}`];
            const arry_2 = [`Improvements: ${cybernetics}`, `Weight: ${mass}`, `Species:${species}`, `Skin Color: ${skinColor}`, `Height: ${height}`, `Home World: ${affiliate1}`];

            // looping through paragraphs set 1
            $('.details_1 p').each(function(index, elemenet) {
                // looping through data array 
                $(array_1).each(function(index2, data_content) {
                    if (index === index2) {
                        $(elemenet).text(data_content).animate({
                            letterSpacing: '5px',
                            'background-image': 'linear-gradient(to top, #fafafa 0%, #86312c 100%)',
                        });
                    }
                })
            })

            // looping through paragraphs set 2
            $('.details_2 p').each(function(index, elemenet) {
                // looping through data array 
                $(arry_2).each(function(index2, data_content) {
                    if (index === index2) {
                        $(elemenet).text(data_content).animate({
                            letterSpacing: '2px',
                            'background-image': 'linear-gradient(to top, #fafafa 0%, #86312c 100%)',
                        });
                    }
                })
            })
        })
    }

    // clear interval on click for automatic randaring of profile
    $('.crawl').on('animationend webkitAnimationEnd', () => {
            setInterval(generateXter, 9000);
        })
        // generate starwasr charactor prifile on click
    $(document).on('click', generateXter);
})
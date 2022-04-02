# Restautan website
There's my first angular project, The Restaurant website. The point was to practice web development, but from inside site. So I didn't pay attention for design, yet I was focused on creating a lot of useful mechanisms on website and connecting between front and back(firebase).   
# Used technlogies    
-Angular, TS, SCSS, HTML, Firebase    
# Guide   
After load page, it shows home, when you can see description about restaurant and contact data:   
![Alt text](/ss/ss1.png?raw=true "Home")
As unlogged user you can also watch menu, it shows list of dishes with price and quantity. It's available for you to set dolar or euro currency, change number of dishes loading on screen and flirting them:   
![Alt text](/ss/ss2.png?raw=true "Filtring panel")    
![Alt text](/ss/ss3.png?raw=true "Menu")    
To unlock more option, you need to be logged, there's two ways, the first is to log in, if you already have had the account:    
![Alt text](/ss/ss4.png?raw=true "Log in")    
The second is to sign up:   
![Alt text](/ss/ss5.png?raw=true "Sing in")    
Now you can go to the "cart", where you will find informations about reserved dishes: 
![Alt text](/ss/ss9.png?raw=true "Cart")    
If you go back to menu card, you will able to add and remove dishes from cart. You can also to click at the name of the dish:
![Alt text](/ss/ss10.png?raw=true "Menu for logged users")    
Then you're gonna see details and reviews of it. After add course to cart, you're able to rate and review it:
![Alt text](/ss/ss11.png?raw=true "Details")    
![Alt text](/ss/ss12.png?raw=true "Reviews")    
If you are admin or manager, it will be possible for you visit "add dish" panel:
![Alt text](/ss/ss6.png?raw=true "Add dish")    
Except adding dishes, you can also delete or update course from the current menu:
![Alt text](/ss/ss7.png?raw=true "Manage dishes")    
![Alt text](/ss/ss8.png?raw=true "Update dish")    
Admin has got his own panel, where he can change type of persistence and rank of the every user. He also can bans or unbans other users.    
<b>Types of pesistence</b>:    
Local- you need to click logout, if you close the page, you will be still logged    
Session - You will be unlogged, if you close the page   
None - You will be unlogged, if you refresh the page    
<b>Banned user</b> cannot rate and review dishes    
![Alt text](/ss/ss13.png?raw=true "Admin panel")        
Video guide: https://youtu.be/38eoZZ3S_9c   


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

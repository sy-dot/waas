const exec = require('child_process').exec;

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
};


//// Открыть меню
$('.nav-menu-btn').on('click', function (e) {
  e.preventDefault();
  $('.menu').toggleClass('menu_active');
  $('#main-area').toggleClass('main-area_active');
})

//// Открывать\Закрывать меню на ESC
$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    $('.menu').removeClass('menu_active');
    $('#main-area').removeClass('main-area_active');
    $('.nav-menu-btn').removeClass('opened');
  }
});

// https://www.toptal.com/developers/keycode

//// Убрать menu_disabled через N после загрузки страницы
setTimeout(function () {
  $('.menu').removeClass('menu_disabled');
}, 100);


//// ACCORDION
// document.querySelectorAll('.accordion__btn').forEach(button => {
//   button.addEventListener('click', () => {
//     button.classList.toggle('accordion__btn--active')
//   })
// })

//// ACTION BTN's
$(document).ready(function () {

  $(".install-btn").click(function () {
    $(this).text("Установка");
    $(this).addClass("btn-danger");
    $(this).removeClass("btn-warning");
  });


  $(".act-btn").click(function () {
    $(this).text("Активация");
    $(this).addClass("apply__active");
    // $(this).removeClass("btn-warning");
  });

  $(".apply-btn").click(function () {
    $(this).text("Установка");
    $(this).addClass("apply__active");
    // $(this).removeClass("btn-warning");
  });

});


//// PREVENT DRAGGING
$('a').attr('draggable', false);


//// CMD COMMANDS

// Show Seconds In System Clock
function ShowSecondsInSystemClock1() {
  execute('REG ADD "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /V ShowSecondsInSystemClock /T REG_DWORD /D 1 /F & taskkill /f /im explorer.exe & start explorer.exe');
}

function ShowSecondsInSystemClock0() {
  execute('REG ADD "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /V ShowSecondsInSystemClock /T REG_DWORD /D 0 /F & taskkill /f /im explorer.exe & start explorer.exe');
}


// RUNTIME COMPONENT's
function InstallVisualCPlusPlus() {
  execute('mkdir "%TEMP%\\WAAS_FILES" & cd "%TEMP%\\WAAS_FILES" & curl -L -o visuals.zip https://github.com/sy-dot/waas-files/raw/main/Runtime-Components/visuals_NOV-2022-JUN-2010.zip & tar -xf visuals.zip & del /f visuals.zip & start cmd.exe /k "visuals\\# INSTALL_ALL.bat" & exit');
}

function InstallDirectX() {
  execute('mkdir "%TEMP%\\WAAS_FILES" & cd "%TEMP%\\WAAS_FILES" & curl -L -o directx.zip https://github.com/sy-dot/waas-files/raw/main/Runtime-Components/directx_DEC-2021-JUN-2010.zip & tar -xf directx.zip & del /f directx.zip & start cmd.exe /k "directx\\# INSTALL_ALL.bat" & exit');
}


//// ACTIVATION
// ACTIVATE WINDOWS
function ActivateWindows() {
  execute('mkdir "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & attrib +h "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" /s /d & cd "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & curl -L -o aact.zip https://github.com/sy-dot/waas-files/raw/main/Act/AAct.v4.2.8.zip & tar -xf aact.zip & del /f aact.zip & cd aact & start "Активация" cmd.exe /k "echo Активация... & AAct_x64.exe /win=act /wingvlk & cd ../../ & rd /s /q "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & title Готово & echo. & echo Готово, желательна перезагрузка. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"');
}

// ACTIVATE OFFICE
function ActivateOffice() {
  execute('mkdir "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & attrib +h "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" /s /d & cd "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & curl -L -o aact.zip https://github.com/sy-dot/waas-files/raw/main/Act/AAct.v4.2.8.zip & tar -xf aact.zip & del /f aact.zip & cd aact & start "Активация" cmd.exe /k "echo Активация... & AAct_x64.exe /ofs=act /ofsgvlk & cd ../../ & rd /s /q "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & title Готово & echo. & echo Готово, желательна перезагрузка. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"');
}
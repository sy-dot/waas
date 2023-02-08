const exec = require('child_process').exec;

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
};


//// Открыть меню ////
$('.nav-menu-btn').on('click', function (e) {
  e.preventDefault();
  $('.menu').toggleClass('menu_active');
  $('#main-area').toggleClass('main-area_active');
})

// Открывать\Закрывать меню на ESC
$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    $('.menu').removeClass('menu_active');
    $('#main-area').removeClass('main-area_active');
    $('.nav-menu-btn').removeClass('opened');
  }
});

// https://www.toptal.com/developers/keycode

//// Убрать menu_disabled через N после загрузки страницы ////
setTimeout(function () {
  $('.menu').removeClass('menu_disabled');
}, 100);


//// ACTION BTN's ////
$(document).ready(function () {

  $(".btn.action.install").html('<i class="fa-duotone fa-square-chevron-down"></i>' + ' ' + "Установить");
  $(".btn.action.install").click(function () {
    $(this).html('<i class="fa-duotone fa-square-chevron-down"></i>' + ' ' + "Установка");
    $(this).addClass("action__active");
  });


  $(".btn.action.act").html('<i class="fa-duotone fa-square-check"></i>' + ' ' + "Активировать");
  $(".btn.action.act").click(function () {
    $(this).html('<i class="fa-duotone fa-square-check"></i>' + ' ' + "Активация");
    $(this).addClass("action__active");
  });

  $(".btn.action.apply").html('<i class="fa-duotone fa-square-check"></i>' + ' ' + "Применить");
  $(".btn.action.unapply").html('<i class="fa-duotone fa-square-xmark"></i>' + ' ' + "Отменить");
  $(".btn.action.unapply").addClass("red");

});


//// PREVENT DRAGGING ////
$('a').attr('draggable', false);
$('img').attr('draggable', false);


//// CMD COMMANDS ////

//// TWEAKS
// Включить\Отключить секунды
function ShowSecondsInSystemClock1() {
  execute('REG ADD "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /V ShowSecondsInSystemClock /T REG_DWORD /D 1 /F');
  setTimeout(function () {
    execute('taskkill /f /im explorer.exe & start explorer.exe');
  }, 1000);
}

function ShowSecondsInSystemClock0() {
  execute('REG ADD "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /V ShowSecondsInSystemClock /T REG_DWORD /D 0 /F');
  setTimeout(function () {
    execute('taskkill /f /im explorer.exe & start explorer.exe');
  }, 1000);
}

// Схема питания - Высокая производительность
function PowerSchemeHighPerformance() {
  execute('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 & powercfg.cpl');
}

// Включить\Отключить UAC
function DisableUAC() {
  execute('reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "EnableLUA" /t REG_DWORD /d 0 /f');
  execute('reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "PromptOnSecureDesktop" /t REG_DWORD /d 0 /f');
  execute('reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "ConsentPromptBehaviorAdmin" /t REG_DWORD /d 0 /f');
  setTimeout(function () {
    execute('start cmd.exe /k "title Готово & echo Требуется перезагрузка ПК. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"');
  }, 1000);
}

function EnableUAC() {
  execute('reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "EnableLUA" /t REG_DWORD /d 1 /f');
  execute('reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "PromptOnSecureDesktop" /t REG_DWORD /d 1 /f');
  execute('reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "ConsentPromptBehaviorAdmin" /t REG_DWORD /d 5 /f');
  setTimeout(function () {
    execute('start cmd.exe /k "title Готово & echo Требуется перезагрузка ПК. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"');
  }, 1000);
}

// Включить\Отключить SMARTSCREEN
function DisableSmartScreen() {
  execute('reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v SmartScreenEnabled /t REG_SZ /d "Off" /f');
  execute('reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\AppHost" /v "EnableWebContentEvaluation" /t REG_DWORD /d 0 /f');
  execute('reg add "HKCU\Software\Classes\Local Settings\Software\Microsoft\Windows\CurrentVersion\AppContainer\Storage\microsoft.microsoftedge_8wekyb3d8bbwe\MicrosoftEdge\PhishingFilter" /v "EnabledV9" /t REG_DWORD /d 0 /f');
  setTimeout(function () {
    execute('start cmd.exe /k "title Готово & echo Готово & pause & exit"');
  }, 1000);
}

function EnableSmartScreen() {
  execute('reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v SmartScreenEnabled /t REG_SZ /d "Warn" /f');
  execute('reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\AppHost" /v "EnableWebContentEvaluation" /t REG_DWORD /d 1 /f');
  execute('reg add "HKCU\Software\Classes\Local Settings\Software\Microsoft\Windows\CurrentVersion\AppContainer\Storage\microsoft.microsoftedge_8wekyb3d8bbwe\MicrosoftEdge\PhishingFilter" /v "EnabledV9" /t REG_DWORD /d 1 /f');
  setTimeout(function () {
    execute('start cmd.exe /k "title Готово & echo Готово & pause & exit"');
  }, 1000);
}


//// RUNTIME COMPONENT's
// Visual C++
function InstallVisualCPlusPlus() {
  execute('mkdir "%TEMP%\\WAAS_FILES" & cd "%TEMP%\\WAAS_FILES" & curl -L -o visuals.zip https://github.com/sy-dot/waas-files/raw/main/Runtime-Components/visuals_NOV-2022-JUN-2010.zip & tar -xf visuals.zip & del /f visuals.zip & start cmd.exe /k "visuals\\# INSTALL_ALL.bat" & exit');
}

// DirectX
function InstallDirectX() {
  execute('mkdir "%TEMP%\\WAAS_FILES" & cd "%TEMP%\\WAAS_FILES" & curl -L -o directx.zip https://github.com/sy-dot/waas-files/raw/main/Runtime-Components/directx_DEC-2021-JUN-2010.zip & tar -xf directx.zip & del /f directx.zip & start cmd.exe /k "directx\\# INSTALL_ALL.bat" & exit');
}


//// Активация
// Активировать Windows
function ActivateWindows() {
  execute('mkdir "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & attrib +h "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" /s /d & cd "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & curl -L -o aact.zip https://github.com/sy-dot/waas-files/raw/main/Act/AAct.v4.2.8.zip & tar -xf aact.zip & del /f aact.zip & cd aact & start "Активация" cmd.exe /k "echo Активация... & AAct_x64.exe /win=act /wingvlk & cd ../../ & rd /s /q "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & title Готово & echo. & echo Готово, желательна перезагрузка. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"');
}

// Активировать Офис
function ActivateOffice() {
  execute('mkdir "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & attrib +h "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" /s /d & cd "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & curl -L -o aact.zip https://github.com/sy-dot/waas-files/raw/main/Act/AAct.v4.2.8.zip & tar -xf aact.zip & del /f aact.zip & cd aact & start "Активация" cmd.exe /k "echo Активация... & AAct_x64.exe /ofs=act /ofsgvlk & cd ../../ & rd /s /q "%SystemDrive%\\Users\\%UserName%\\Desktop\\.WAAS-FILES.cache" & title Готово & echo. & echo Готово, желательна перезагрузка. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"');
}
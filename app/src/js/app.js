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

//// Убрать menu_disabled через N после загрузки страницы - костыль, что бы меню не пролетало во время загрузки ////
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


//// SCROLL TO TOP ////
var scrollToTopBTN = $('#scroll-to-top-btn');

$(window).scroll(function () {
  if ($(window).scrollTop() > 500) {
    scrollToTopBTN.addClass('show');
  } else {
    scrollToTopBTN.removeClass('show');
  }
});

scrollToTopBTN.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, '1000');
});


//// CMD COMMANDS ////
let i = ' & ';
let eoff = '@echo off'
let enc = 'chcp 65001'
let sp = ' '
//// TWEAKS
// Включить\Отключить секунды
function ShowSecondsInSystemClock1() {
  execute('REG ADD "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /V ShowSecondsInSystemClock /T REG_DWORD /D 1 /F');
  setTimeout(function () {
    execute('taskkill /f /im explorer.exe & start explorer.exe');
  }, 500);
}

function ShowSecondsInSystemClock0() {
  execute('REG ADD "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /V ShowSecondsInSystemClock /T REG_DWORD /D 0 /F');
  setTimeout(function () {
    execute('taskkill /f /im explorer.exe & start explorer.exe');
  }, 500);
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
    execute('start cmd.exe /k "title Готово & echo Требуется перезагрузка ПК. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1 & exit"');
  }, 1000);
}

function EnableUAC() {
  execute('reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "EnableLUA" /t REG_DWORD /d 1 /f');
  execute('reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "PromptOnSecureDesktop" /t REG_DWORD /d 1 /f');
  execute('reg add "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "ConsentPromptBehaviorAdmin" /t REG_DWORD /d 5 /f');
  setTimeout(function () {
    execute('start cmd.exe /k "title Готово & echo Требуется перезагрузка ПК. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1 & exit"');
  }, 1000);
}

// Включить\Отключить SMARTSCREEN
function DisableSmartScreen() {
  execute('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "SmartScreenEnabled" /t REG_SZ /d "Off" /f');
  execute('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AppHost" /v "EnableWebContentEvaluation" /t REG_DWORD /d 0 /f');
  execute('reg add "HKCU\\Software\\Classes\\Local Settings\\Software\\Microsoft\\Windows\\CurrentVersion\\AppContainer\\Storage\\microsoft.microsoftedge_8wekyb3d8bbwe\\MicrosoftEdge\\PhishingFilter" /v "EnabledV9" /t REG_DWORD /d 0 /f');
  setTimeout(function () {
    execute('start cmd.exe /k "title Готово & echo Готово & pause & exit"');
  }, 1000);
}

function EnableSmartScreen() {
  execute('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "SmartScreenEnabled" /t REG_SZ /d "Warn" /f');
  execute('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AppHost" /v "EnableWebContentEvaluation" /t REG_DWORD /d 1 /f');
  execute('reg add "HKCU\\Software\\Classes\\Local Settings\\Software\\Microsoft\\Windows\\CurrentVersion\\AppContainer\\Storage\\microsoft.microsoftedge_8wekyb3d8bbwe\\MicrosoftEdge\\PhishingFilter" /v "EnabledV9" /t REG_DWORD /d 1 /f');
  setTimeout(function () {
    execute('start cmd.exe /k "title Готово & echo Готово & pause & exit"');
  }, 1000);
}


// Отключить Windows Defender
function DWNDisableWinDef() {
  execute('cd "%UserProfile%\\Desktop" & curl -L -o DisableWinDef.cmd https://raw.githubusercontent.com/sy-dot/waas-files/main/Tweaks/DisableWinDef.cmd & start "Готово" cmd.exe /k "@echo off & echo. & echo Готово & echo. & pause & exit"');
}


// Удалить ONEDRIVE
function DeleteOneDrive() {
  let c0 = 'start "Удаляю OneDrive" cmd.exe /k "';
  let c1 = '@echo off & chcp 65001 & title Удаляю OneDrive & echo.' + i;
  let c2 = 'echo Убиваю задачу & taskkill /f /im OneDrive.exe & echo.' + i;
  let c3 = 'echo Удаляю OneDrive x86 & "%windir%\\System32\\OneDriveSetup.exe" /uninstall & echo.' + i;
  let c4 = 'echo Удаляю OneDrive x64 & "%windir%\\SysWOW64\\OneDriveSetup.exe" /uninstall' + i;
  let c5 = 'echo. & echo.' + i;
  let c6 = 'echo Подчищаю реестр' + i;
  let c7 = 'reg delete "HKCR\\CLSID\\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /f' + i;
  let c8 = 'reg delete "HKCR\\Wow6432Node\\CLSID\\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /f' + i;
  let c9 = 'reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Desktop\\NameSpace\\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /f' + i;
  let c10 = 'echo. & echo.' + i;
  let c11 = 'echo Удаляю папки с данными' + i;
  let c12 = 'rd /s /q "%userprofile%\\OneDrive"' + i;
  let c13 = 'rd /s /q "%userprofile%\\AppData\\Local\\Microsoft\\OneDrive"' + i;
  let c14 = 'rd /s /q "%allusersprofile%\\Microsoft OneDrive"' + i;
  let c15 = 'echo. & echo. & echo.' + i;
  let c16 = 'echo Готово, если вы видите ошибки - не значит что, что-то пошло не так.' + i;
  let c17 = 'echo Проверьте в трее (tray) и в автозагрузке наличии OneDrive - если он отсутствует, значит все успешно.' + i;
  let c18 = 'echo. & taskkill /f /im explorer.exe > nul & start explorer.exe & pause & exit"';
  execute(c0 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + c10 + c11 + c12 + c13 + c14 + c15 + c16 + c17 + c18);
}


// Удалить Cortana
function DeleteCortana() {
  execute('start powershell "Get-AppxPackage -allusers Microsoft.549981C3F5F10 | Remove-AppxPackage');
  let c0 = 'start "Отключение Cortana" cmd.exe /k "@echo off & chcp 65001 & title Отключение Cortana' + i;
  let c1 = 'reg add "HKLM\\SOFTWARE\\Microsoft\\Speech_OneCore\\Preferences" /v "ModelDownloadAllowed" /t REG_DWORD /d "0" /f' + i;
  let c2 = 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v "AllowCloudSearch" /t REG_DWORD /d "0" /f' + i;
  let c3 = 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v "AllowCortana" /t REG_DWORD /d "0" /f' + i;
  let c4 = 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v "AllowSearchToUseLocation" /t REG_DWORD /d "0" /f' + i;
  let c5 = 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v "ConnectedSearchUseWeb" /t REG_DWORD /d "0" /f' + i;
  let c6 = 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v "DisableWebSearch" /t REG_DWORD /d "1" /f' + i;
  let c7 = 'reg add "HKCU\\Software\\Microsoft\\InputPersonalization" /v "RestrictImplicitInkCollection" /t REG_DWORD /d "1" /f' + i;
  let c8 = 'reg add "HKCU\\Software\\Microsoft\\InputPersonalization" /v "RestrictImplicitTextCollection" /t REG_DWORD /d "1" /f' + i;
  let c9 = 'reg add "HKCU\\Software\\Microsoft\\InputPersonalization\\TrainedDataStore" /v "HarvestContacts" /t REG_DWORD /d "0" /f' + i;
  let c10 = 'reg add "HKCU\\Software\\Microsoft\\Personalization\\Settings" /v "AcceptedPrivacyPolicy" /t REG_DWORD /d "0" /f' + i;
  let c11 = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Windows Search" /v "CortanaConsent" /t REG_DWORD /d "0" /f' + i;
  let c12 = 'echo. & echo. & echo. & echo Дождитесь удаления Cortana (powershell) & echo. & echo.' + i;
  let c13 = 'echo Желательна перезагрузка. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"'
  setTimeout(function () {
    execute(c0 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + c10 + c11 + c12 + c13);
  }, 500);
}


// Отключить историю панель быстрого доступа\run
function DisableHistoryQuickPanel() {
  execute('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "ShowFrequent" /t REG_DWORD /d "0" /f');
  execute('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "ShowRecent" /t REG_DWORD /d "0" /f');
  execute('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Start_TrackDocs" /t REG_DWORD /d "0" /f');
  execute('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Start_TrackProgs" /t REG_DWORD /d "0" /f');
  setTimeout(function () {
    execute('start "Готово" cmd.exe /k "' + eoff + i + enc + i + 'echo Готово & pause & exit"');
  }, 500)
}

function EnableHistoryQuickPanel() {
  execute('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "ShowFrequent" /f');
  execute('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "ShowRecent" /f');
  execute('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Start_TrackDocs" /f');
  execute('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Start_TrackProgs" /f');
  setTimeout(function () {
    execute('start "Готово" cmd.exe /k "' + eoff + i + enc + i + 'echo Готово & pause & exit"');
  }, 500)
}


// Отключить рекламу
function DisableAds() {
  let start = 'start cmd.exe /k "' + eoff + i + enc + i;
  let c1 = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d "0" /f' + i;
  let c2 = 'reg add "HKLM\\SOFTWARE\\Microsoft\\PolicyManager\\current\\device\\Bluetooth" /v "AllowAdvertising" /t REG_DWORD /d "0" /f' + i;
  let end = 'echo Готово & pause & exit"';
  execute(start+c1+c2+end);
}


// Сжать\Очистить Windows
function CheckIsCompactWindows() {
  execute('start cmd.exe /k "compact /CompactOS:query & pause & exit"')
}

function CompactWindows() {
  let start = 'start "Сжатие" cmd.exe /k "' + eoff + i + enc + i;
  let c1 = 'echo Операция займет некоторое время... & echo.' + i;
  let c2 = 'compact /CompactOS:always';
  let end = '"';
  execute(start+c1+c2+end);
}

function UnCompactWindows() {
  let start = 'start "Back to the Future" cmd.exe /k "' + eoff + i + enc + i;
  let c1 = 'echo Операция займет некоторое время... & echo.' + i;
  let c2 = 'compact /CompactOS:never';
  let end = '"';
  execute(start+c1+c2+end);
}

function DismStartComponentCleanup() {
  execute('start cmd.exe /k "dism.exe /online /Cleanup-Image /StartComponentCleanup"');
}

function CleanUp() {
  let start = 'start cmd.exe /k "' + eoff + i + enc + i;
  let c1 = 'del %TEMP%\*.* /s /q' + i;
  let c2 = 'cleanmgr /sagerun /d%SystemDrive%';
  let end = '"'
  execute(start+c1+c2+end);
}


// Система
function gpedit() {
  execute('gpedit.msc');
}

function taskmgr() {
  execute('taskmgr');
}

function slmgr() {
  execute('slmgr /dlv');
}

function ToSafeMode() {
  execute('bcdedit /set {current} safeboot minimal & shutdown /r /t 1');
}

function CreateRestorePoint() {
  execute('start powershell -noexit "Checkpoint-Computer -Description "WAAS_$(get-date -f MM.dd.yyyy)" -RestorePointType "MODIFY_SETTINGS"; write-host Точка восстановления создана: WAAS_$(get-date -f MM.dd.yyyy); cmd.exe /k \'pause & exit\'; exit"');
}

function SystemPropertiesProtection() {
  execute('SystemPropertiesProtection');
}

function CreateBackupRegistry() {
  let start = 'start cmd.exe /k "@echo off' + i + enc + i;
  let c0 = 'echo Это займет некоторое время... & echo.' + i;
  let c1 = 'mkdir "%UserProfile%\\Desktop\\Registry.Backup.%date:~-7,2%.%date:~-10,2%.%date:~-4,4%"' + i;
  let c2 = 'reg export HKCR "%UserProfile%\\Desktop\\Registry.Backup.%date:~-7,2%.%date:~-10,2%.%date:~-4,4%\\HKCR.reg" /y' + i;
  let c3 = 'reg export HKCU "%UserProfile%\\Desktop\\Registry.Backup.%date:~-7,2%.%date:~-10,2%.%date:~-4,4%\\HKCU.reg" /y' + i;
  let c4 = 'reg export HKLM "%UserProfile%\\Desktop\\Registry.Backup.%date:~-7,2%.%date:~-10,2%.%date:~-4,4%\\HKLM.reg" /y' + i;
  let c5 = 'reg export HKU "%UserProfile%\\Desktop\\Registry.Backup.%date:~-7,2%.%date:~-10,2%.%date:~-4,4%\\HKU.reg" /y' + i;
  let c6 = 'reg export HKCC "%UserProfile%\\Desktop\\Registry.Backup.%date:~-7,2%.%date:~-10,2%.%date:~-4,4%\\HKCC.reg" /y' + i;
  let end = 'echo Готово & pause & exit"'
  execute(start+c0+c1+c2+c3+c4+c5+c6+end);
}


//// RUNTIME COMPONENT's
// Visual C++
function InstallVisualCPlusPlus() {
  let c0 = 'mkdir "%TEMP%\\WAAS_FILES" & cd "%TEMP%\\WAAS_FILES"' + i;
  let c1 = 'curl -L -o visuals.zip https://github.com/sy-dot/waas-files/raw/main/Runtime-Components/visuals_NOV-2022-JUN-2010.zip' + i;
  let c2 = 'tar -xf visuals.zip & del /f visuals.zip' + i;
  let c3 = 'start cmd.exe /k "visuals\\# INSTALL_ALL.bat" & exit'
  execute(c0+c1+c2+c3);
}

// DirectX
function InstallDirectX() {
  let c0 = 'mkdir "%TEMP%\\WAAS_FILES" & cd "%TEMP%\\WAAS_FILES"' + i;
  let c1 = 'curl -L -o directx.zip https://github.com/sy-dot/waas-files/raw/main/Runtime-Components/directx_DEC-2021-JUN-2010.zip' + i;
  let c2 = 'tar -xf directx.zip & del /f directx.zip' + i;
  let c3 = 'start cmd.exe /k "directx\\# INSTALL_ALL.bat" & exit'
  execute(c0+c1+c2+c3);
}


//// Активация
// Активировать Windows
function ActivateWindows() {
  let c0 = 'mkdir "%UserProfile%\\Desktop\\.WAAS-FILES.cache"' + i;
  let c1 = 'attrib +h "%UserProfile%\\Desktop\\.WAAS-FILES.cache" /s /d' + i;
  let c2 = 'cd "%UserProfile%\\Desktop\\.WAAS-FILES.cache"' + i;
  let c3 = 'curl -L -o aact.zip https://github.com/sy-dot/waas-files/raw/main/Act/AAct.v4.2.8.zip' + i;
  let c4 = 'tar -xf aact.zip & del /f aact.zip & cd aact' + i;
  let c5 = 'start "Активация" cmd.exe /k "' + eoff + i + enc + i;
  let c6 = 'echo Активация...' + i;
  let c7 = 'AAct_x64.exe /win=act /wingvlk' + i;
  let c8 = 'cd ../../ & rd /s /q "%UserProfile%\\Desktop\\.WAAS-FILES.cache"' + i;
  let c9 = 'title Готово & echo. & echo Готово, желательна перезагрузка. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"';
  execute(c0+c1+c2+c3+c4+c5+c6+c7+c8+c9);
  // execute('mkdir "%UserProfile%\\Desktop\\.WAAS-FILES.cache" & attrib +h "%UserProfile%\\Desktop\\.WAAS-FILES.cache" /s /d & cd "%UserProfile%\\Desktop\\.WAAS-FILES.cache" & curl -L -o aact.zip https://github.com/sy-dot/waas-files/raw/main/Act/AAct.v4.2.8.zip & tar -xf aact.zip & del /f aact.zip & cd aact & start "Активация" cmd.exe /k "echo Активация... & AAct_x64.exe /win=act /wingvlk & cd ../../ & rd /s /q "%UserProfile%\\Desktop\\.WAAS-FILES.cache" & title Готово & echo. & echo Готово, желательна перезагрузка. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"');
}

// Активировать Офис
function ActivateOffice() {
  let c0 = 'mkdir "%UserProfile%\\Desktop\\.WAAS-FILES.cache"' + i;
  let c1 = 'attrib +h "%UserProfile%\\Desktop\\.WAAS-FILES.cache" /s /d' + i;
  let c2 = 'cd "%UserProfile%\\Desktop\\.WAAS-FILES.cache"' + i;
  let c3 = 'curl -L -o aact.zip https://github.com/sy-dot/waas-files/raw/main/Act/AAct.v4.2.8.zip' + i;
  let c4 = 'tar -xf aact.zip & del /f aact.zip & cd aact' + i;
  let c5 = 'start "Активация" cmd.exe /k "' + eoff + i + enc + i;
  let c6 = 'echo Активация...' + i;
  let c7 = 'AAct_x64.exe /ofs=act /ofsgvlk' + i;
  let c8 = 'cd ../../ & rd /s /q "%UserProfile%\\Desktop\\.WAAS-FILES.cache"' + i;
  let c9 = 'title Готово & echo. & echo Готово, желательна перезагрузка. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"';
  execute(c0+c1+c2+c3+c4+c5+c6+c7+c8+c9);
  // execute('mkdir "%UserProfile%\\Desktop\\.WAAS-FILES.cache" & attrib +h "%UserProfile%\\Desktop\\.WAAS-FILES.cache" /s /d & cd "%UserProfile%\\Desktop\\.WAAS-FILES.cache" & curl -L -o aact.zip https://github.com/sy-dot/waas-files/raw/main/Act/AAct.v4.2.8.zip & tar -xf aact.zip & del /f aact.zip & cd aact & start "Активация" cmd.exe /k "echo Активация... & AAct_x64.exe /ofs=act /ofsgvlk & cd ../../ & rd /s /q "%UserProfile%\\Desktop\\.WAAS-FILES.cache" & title Готово & echo. & echo Готово, желательна перезагрузка. & echo Нажмите любую клавишу для перезагрузки, или закройте это окно. & pause & shutdown /r /t 1"');
}
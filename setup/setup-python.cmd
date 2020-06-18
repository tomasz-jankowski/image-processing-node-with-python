:CheckOS
IF EXIST "%PROGRAMFILES(X86)%" (GOTO 64BIT) ELSE (GOTO 32BIT)

:64BIT
cd %~dp0
start %1python-3.7.7-x64.exe
GOTO END

:32BIT
cd %~dp0
start %1python-3.7.7-x32.exe 
GOTO END

:END
exit
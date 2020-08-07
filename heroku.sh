#!/usr/bin/env bash

############################################
#==========================================#
#       PROGRAM HEAD (declarations)        #
#==========================================#
############################################


#=#=#=#=#= variables =#=#=#=#=#


# ----- program options (arguments) -----
declare -A ProgramOptions=()
declare -A ProgramOptions_description=()

ProgramOptions[help]="help"
ProgramOptions_description[help]="displays this message"

ProgramOptions[start]="start"
ProgramOptions_description[start]="starts heroku dynos of the \"web\" app (based on \`heroku ps:scale web=1\`)"

ProgramOptions[stop]="stop"
ProgramOptions_description[stop]="stops heroku dynos of the \"web\" app (based on \`heroku ps:scale web=0\`)"

ProgramOptions[restart]="restart"
ProgramOptions_description[restart]="stop and start"

ProgramOptions[push]="push"
ProgramOptions_description[push]="stops dynos, pushes (\`git push heroku master\`), starts dynos"

ProgramOptions[aacap]="aacap"
ProgramOptions_description[aacap]="'Add All, Commit And Push'. Takes the next argument after 'aacap' as a commit message"

ProgramOptions[amend]="amend"
ProgramOptions_description[amend]="changes the latest commit message for heroku (based on \`git commit --amend\` and \`git push heroku master -f\`)"



#=#=#=#=#= functions =#=#=#=#=#

# ----- reusable -----

#echoes number of characters of the longest argument passed to the function
max(){
    #$@ - any strings of characters
    declare args=("$@")
    n=0
    for a in "${args[@]}"; do
        if [[ ${#a} -gt $n ]]; then
            n=${#a}
        fi
    done
    echo "$n"
}

Nspaces(){
    #$1 - number of spaces
    local -i n=$1
    local -i i=0
    local spaces=""
    while :; do
        spaces="$spaces "
        i=$((i+1))
        if [[ $i -gt $n ]]; then
            break
        fi
    done
    echo "$spaces"
}

#echoes given string "$1" adjusted by length "$2" (trimmed, or appended spaces)
adjusttolen(){
    #$1 - string
    #$2 - length (has to be integer)

    local str_len="${#1}"
    local -i length=$2
    if [[ $str_len -gt $length ]]; then
        echo "${1::length}"
        return 0
    else
        echo "${1}`Nspaces $((length-str_len))`"
        return 0
    fi

}
#example:
#adjusttolen "$string" 10




# ----- core -----


push(){
    heroku ps:scale web=0 && sleep 2
    git push heroku master
    heroku ps:scale web=1
}

#Add All, Commit And Push
aacap(){
    #$1 - commit message
    git add -A && git commit -m "$1"
    if [ "$?" -ne 0 ]; then
        echo "ERROR: failed to add or commit"
        exit 1
    fi
    heroku ps:scale web=0 && sleep 2
    git push heroku master
    heroku ps:scale web=1
    sleep 2
    heroku logs --tail
}

start(){
    heroku ps:scale web=1
    sleep 2
    heroku logs --tail
}

stop(){
    heroku ps:scale web=0 && sleep 2 && heroku ps:scale web=0 && sleep 2
}

restart(){
    stop
    sleep 1
    start
}

amend(){
    heroku ps:scale web=0 && sleep 1
    git commit --amend
    git push heroku master -f
    heroku ps:scale web=1
}






#=#=#=#=#= interface =#=#=#=#=#
declare -A InterfaceText=()

p="$0"
declare -i max_PO=`max "${ProgramOptions[@]}"`

InterfaceText[help]="Usage: $p COMMAND

 Commands:
"
for opt in "${!ProgramOptions[@]}"; do
    InterfaceText[help]="${InterfaceText[help]} `adjusttolen "${ProgramOptions["$opt"]}" $max_PO` ${ProgramOptions_description["$opt"]}\n"
done




############################################
#==========================================#
#               PROGRAM BODY               #
#==========================================#
############################################


case "$1" in
    "" )
        echo -e "${InterfaceText[help]}"
        ;;
    --* )
        echo -e "${InterfaceText[help]}"
        ;;
    "${ProgramOptions[help]}" )
        echo -e "${InterfaceText[help]}"
        ;;
    "${ProgramOptions[start]}" )
        start
        ;;
    "${ProgramOptions[stop]}" )
        stop
        ;;
    "${ProgramOptions[restart]}" )
        restart
        ;;
    "${ProgramOptions[push]}" )
        push
        ;;
    "${ProgramOptions[aacap]}" )
        if [ -z "$2" ]; then
            echo "ERROR: you have to specify a commit message"
            exit 1
        fi
        aacap "$2"
        ;;
    "${ProgramOptions[amend]}" )
        amend
        ;;
    *)
        echo -e "${InterfaceText[help]}"
        ;;
esac




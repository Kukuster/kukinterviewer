
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


# provide either filename or the content inline
if [[ -f "$1" ]]; then
    tests="`cat $1`"
else
    tests="$1"
fi

tests_=""

declare -i mlen=80
declare pass=""
declare res=""

while read line; do
    if [[ -z $line ]]; then
        continue
    fi

    if [[ "${line:0:1}" == "✓" ]] || [[ "${line:0:1}" == "v" ]] ; then
        pass="True"
    elif [[ "${line:0:1}" == "✕" ]] || [[ "${line:0:1}" == "x" ]]; then
        pass="False"
    else
        continue
    fi
    line="${line:2:200}"
    line="${line%%[*}"
    line="${line//\"/\\\"}"
    
    if [[ -z $line ]]; then
        continue
    fi

    if [[ "$pass" == "True" ]]; then
        res="{  }"
    elif [[ "$pass" == "False" ]]; then
        res="null"
    fi
    
    echo "{ m: `adjusttolen "\\"$line\\"," $mlen` res: $res },"

done <<< "$tests"







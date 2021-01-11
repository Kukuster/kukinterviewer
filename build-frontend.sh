#!/usr/bin/env bash

#  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
#                                                                                         #
#                                   BRIEF DOCUMENTATION                                   #
#    Run as is.                                                                           #
#                                                                                         #
#       OR:                                                                               #
#                                                                                         #
#    1) Use keys --dev or --prod to specify development or production mode for webpack    #
#       (runs npm scripts 'build_andExit' or 'build_prod_andExit' respectively)           #
#    2) Use key --install if the frontend submodule requires 'npm install' beforehand     #
#                                                                                         #
#                                                                                         #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #



declare -r src_path="web/frontend"



########################
###  Read from args  ###
########################
declare needInstall=""
declare env="dev"
for arg in "$@"; do
    case "$arg" in
        -p|--prod|--production)
            env="prod"
            ;;
        -d|--dev|--development)
            env="dev"
            ;;
        -i|--install)
            needInstall=True
            ;;
    esac
done




########################
###  Define scripts  ###
########################

npmInstall(){
    "${install_cmd[@]}" || npm audit fix
}
npmBuild(){
    "${build_cmd[@]}"   && "${after_build_cmd[@]}"
}

# have cd in and cd out (back) in this function
# because while it's needed to proceed depending on the build result,
# it's also needed to change dir back anyway (regardless of build result)
Build(){
    local ec=""
    cd "src/$src_path"
    (npmInstall || npm audit fix) && npmBuild
    ec="$?"
    cd - 1>/dev/null
    return "$ec"
}




########################
###  Interpret args  ###
########################

declare install_cmd=()
declare build_cmd=()
declare after_build_cmd=()

if [ -n "$needInstall" ]; then
    install_cmd=(npm install --also=dev)
else
    install_cmd=(:)
fi

if   [ "$env" == "dev" ]; then
    build_cmd=(npm run build_andExit)
    after_build_cmd=(:)
elif [ "$env" == "prod" ]; then
    build_cmd=(npm run build_prod_andExit)
    after_build_cmd=(npm prune --production)
else
    build_cmd=(false)
    after_build_cmd=(false)
fi




########################
###     Run Build    ###
########################

# only if Build succeeds it proceeds to: remove, create dir, and move dir
Build && \
rm -rf "dist/$src_path" && \
mkdir -p "dist/$src_path" 1>/dev/null 2>&1
mv "src/$src_path/dist" "dist/$src_path"



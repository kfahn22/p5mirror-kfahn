cd "/Users/kathrynfahnline/Documents/GitHub/p5mirror-kfahn/downloads/../p5projects"
#
echo unzip 1 "generativeKaleidescope-I29DSDQOS"
rm -rf "./generativeKaleidescope-I29DSDQOS"
mkdir "./generativeKaleidescope-I29DSDQOS"
pushd "./generativeKaleidescope-I29DSDQOS" > /dev/null
unzip -q "../../downloads/zips/generativeKaleidescope-I29DSDQOS"
popd > /dev/null
#
echo unzip 2 "Sound Fractal-16qW-69XU"
rm -rf "./Sound Fractal-16qW-69XU"
mkdir "./Sound Fractal-16qW-69XU"
pushd "./Sound Fractal-16qW-69XU" > /dev/null
unzip -q "../../downloads/zips/Sound Fractal-16qW-69XU"
popd > /dev/null
#
echo unzip 3 "Tie Dye Shader-sLtJxaZXQ"
rm -rf "./Tie Dye Shader-sLtJxaZXQ"
mkdir "./Tie Dye Shader-sLtJxaZXQ"
pushd "./Tie Dye Shader-sLtJxaZXQ" > /dev/null
unzip -q "../../downloads/zips/Tie Dye Shader-sLtJxaZXQ"
popd > /dev/null
#
echo unzip 4 "Droste-mpVZ1E6R5"
rm -rf "./Droste-mpVZ1E6R5"
mkdir "./Droste-mpVZ1E6R5"
pushd "./Droste-mpVZ1E6R5" > /dev/null
unzip -q "../../downloads/zips/Droste-mpVZ1E6R5"
popd > /dev/null
#
echo unzip 5 "Spherical Tiling-Ma8333Xbv"
rm -rf "./Spherical Tiling-Ma8333Xbv"
mkdir "./Spherical Tiling-Ma8333Xbv"
pushd "./Spherical Tiling-Ma8333Xbv" > /dev/null
unzip -q "../../downloads/zips/Spherical Tiling-Ma8333Xbv"
popd > /dev/null
#
echo unzip 6 "Loading str object-NW09fbBwM"
rm -rf "./Loading str object-NW09fbBwM"
mkdir "./Loading str object-NW09fbBwM"
pushd "./Loading str object-NW09fbBwM" > /dev/null
unzip -q "../../downloads/zips/Loading str object-NW09fbBwM"
popd > /dev/null
#
echo unzip 7 "spherical_tiling-oLB8bRb50"
rm -rf "./spherical_tiling-oLB8bRb50"
mkdir "./spherical_tiling-oLB8bRb50"
pushd "./spherical_tiling-oLB8bRb50" > /dev/null
unzip -q "../../downloads/zips/spherical_tiling-oLB8bRb50"
popd > /dev/null
#
echo unzip 8 "Flower Curl-jjx0VSyi2"
rm -rf "./Flower Curl-jjx0VSyi2"
mkdir "./Flower Curl-jjx0VSyi2"
pushd "./Flower Curl-jjx0VSyi2" > /dev/null
unzip -q "../../downloads/zips/Flower Curl-jjx0VSyi2"
popd > /dev/null

cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi
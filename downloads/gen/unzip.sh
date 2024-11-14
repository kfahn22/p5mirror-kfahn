cd "/Users/kathrynfahnline/Documents/GitHub/p5mirror-kfahn/downloads/../p5projects"
#
echo unzip 1 "LYGIA_kaleidescope_3224-ApOA0ba3i"
rm -rf "./LYGIA_kaleidescope_3224-ApOA0ba3i"
mkdir "./LYGIA_kaleidescope_3224-ApOA0ba3i"
pushd "./LYGIA_kaleidescope_3224-ApOA0ba3i" > /dev/null
unzip -q "../../downloads/zips/LYGIA_kaleidescope_3224-ApOA0ba3i"
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
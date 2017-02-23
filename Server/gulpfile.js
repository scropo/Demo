var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    minify = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    replace = require("gulp-replace"),
    concat = require('gulp-concat'),
    del = require('del'),
    time = /console\.time(End)?\(.*?\)/g,
    include = /mxClient\.include\(.*?\);/g,
    link = /mxClient\.link\(.*?\);/g,
    // target = '',
    min_target='../Demo/VGDesigner-min/',
    publish_target='../Demo/Demo-publish/',
    publish_src='../Demo/Demo1.0.4/',
    min_src='../Demo/VGDesigner/',
    src = {};

function init(client) {
    src.txt = [client + '**/*.txt', client + '**/*.json', client + '**/*.xml']
    src.imagemin = [client + '**/*.jpg', client + '**/*.png', client + '**/*.gif']
    src.lib = ['lib/**/*.js']
    src.router = ['router/**/*.js']
    src.app = [
        'app.js',
        'server.js',
        'package.json',
        'pm2.json',
        '.babelrc',
        'conf/nginx.conf',
        'bin/upgrade.sh'
    ]
    src.minify = [
        client + '**/*.css',
        'node_modules/codemirror/lib/codemirror.css'
    ]
    src.htmlmin = [
        client + '**/*.html'
    ]
    src.uglify = [
        'node_modules/codemirror/lib/codemirror.js',
        'node_modules/codemirror/mode/javascript/javascript.js',
        'node_modules/codemirror/mode/xml/xml.js',
        'node_modules/codemirror/mode/yaml/yaml.js',
        'views/Init.js',
        client + 'js/Init.js',
        client + 'jscolor/jscolor.js',
        client + 'sanitizer/sanitizer.min.js',
        client + 'src/js/mxClient.js',
        client + 'src/js/util/mxLog.js',
        client + 'src/js/util/mxObjectIdentity.js',
        client + 'src/js/util/mxDictionary.js',
        client + 'src/js/util/mxResources.js',
        client + 'src/js/util/mxPoint.js',
        client + 'src/js/util/mxRectangle.js',
        client + 'src/js/util/mxEffects.js',
        client + 'src/js/util/mxUtils.js',
        client + 'src/js/util/mxConstants.js',
        client + 'src/js/util/mxEventObject.js',
        client + 'src/js/util/mxMouseEvent.js',
        client + 'src/js/util/mxEventSource.js',
        client + 'src/js/util/mxEvent.js',
        client + 'src/js/util/mxXmlRequest.js',
        client + 'src/js/util/mxClipboard.js',
        client + 'src/js/util/mxWindow.js',
        client + 'src/js/util/mxForm.js',
        client + 'src/js/util/mxImage.js',
        client + 'src/js/util/mxDivResizer.js',
        client + 'src/js/util/mxDragSource.js',
        client + 'src/js/util/mxToolbar.js',
        client + 'src/js/util/mxUndoableEdit.js',
        client + 'src/js/util/mxUndoManager.js',
        client + 'src/js/util/mxUrlConverter.js',
        client + 'src/js/util/mxPanningManager.js',
        client + 'src/js/util/mxPopupMenu.js',
        client + 'src/js/util/mxAutoSaveManager.js',
        client + 'src/js/util/mxAnimation.js',
        client + 'src/js/util/mxMorphing.js',
        client + 'src/js/util/mxImageBundle.js',
        client + 'src/js/util/mxImageExport.js',
        client + 'src/js/util/mxAbstractCanvas2D.js',
        client + 'src/js/util/mxXmlCanvas2D.js',
        client + 'src/js/util/mxSvgCanvas2D.js',
        client + 'src/js/util/mxVmlCanvas2D.js',
        client + 'src/js/util/mxGuide.js',
        client + 'src/js/shape/mxStencil.js',
        client + 'src/js/shape/mxShape.js',
        client + 'src/js/shape/mxStencilRegistry.js',
        client + 'src/js/shape/mxMarker.js',
        client + 'src/js/shape/mxActor.js',
        client + 'src/js/shape/mxCloud.js',
        client + 'src/js/shape/mxRectangleShape.js',
        client + 'src/js/shape/mxEllipse.js',
        client + 'src/js/shape/mxDoubleEllipse.js',
        client + 'src/js/shape/mxRhombus.js',
        client + 'src/js/shape/mxPolyline.js',
        client + 'src/js/shape/mxArrow.js',
        client + 'src/js/shape/mxArrowConnector.js',
        client + 'src/js/shape/mxText.js',
        client + 'src/js/shape/mxTriangle.js',
        client + 'src/js/shape/mxHexagon.js',
        client + 'src/js/shape/mxLine.js',
        client + 'src/js/shape/mxImageShape.js',
        client + 'src/js/shape/mxLabel.js',
        client + 'src/js/shape/mxCylinder.js',
        client + 'src/js/shape/mxConnector.js',
        client + 'src/js/shape/mxSwimlane.js',
        client + 'src/js/layout/mxGraphLayout.js',
        client + 'src/js/layout/mxStackLayout.js',
        client + 'src/js/layout/mxPartitionLayout.js',
        client + 'src/js/layout/mxCompactTreeLayout.js',
        client + 'src/js/layout/mxRadialTreeLayout.js',
        client + 'src/js/layout/mxFastOrganicLayout.js',
        client + 'src/js/layout/mxCircleLayout.js',
        client + 'src/js/layout/mxParallelEdgeLayout.js',
        client + 'src/js/layout/mxCompositeLayout.js',
        client + 'src/js/layout/mxEdgeLabelLayout.js',
        client + 'src/js/layout/hierarchical/model/mxGraphAbstractHierarchyCell.js',
        client + 'src/js/layout/hierarchical/model/mxGraphHierarchyNode.js',
        client + 'src/js/layout/hierarchical/model/mxGraphHierarchyEdge.js',
        client + 'src/js/layout/hierarchical/model/mxGraphHierarchyModel.js',
        client + 'src/js/layout/hierarchical/model/mxSwimlaneModel.js',
        client + 'src/js/layout/hierarchical/stage/mxHierarchicalLayoutStage.js',
        client + 'src/js/layout/hierarchical/stage/mxMedianHybridCrossingReduction.js',
        client + 'src/js/layout/hierarchical/stage/mxMinimumCycleRemover.js',
        client + 'src/js/layout/hierarchical/stage/mxCoordinateAssignment.js',
        client + 'src/js/layout/hierarchical/stage/mxSwimlaneOrdering.js',
        client + 'src/js/layout/hierarchical/mxHierarchicalLayout.js',
        client + 'src/js/layout/hierarchical/mxSwimlaneLayout.js',
        client + 'src/js/model/mxGraphModel.js',
        client + 'src/js/model/mxCell.js',
        client + 'src/js/model/mxGeometry.js',
        client + 'src/js/model/mxCellPath.js',
        client + 'src/js/view/mxPerimeter.js',
        client + 'src/js/view/mxPrintPreview.js',
        client + 'src/js/view/mxStylesheet.js',
        client + 'src/js/view/mxCellState.js',
        client + 'src/js/view/mxGraphSelectionModel.js',
        client + 'src/js/view/mxCellEditor.js',
        client + 'src/js/view/mxCellRenderer.js',
        client + 'src/js/view/mxEdgeStyle.js',
        client + 'src/js/view/mxStyleRegistry.js',
        client + 'src/js/view/mxGraphView.js',
        client + 'src/js/view/mxGraph.js',
        client + 'src/js/view/mxCellOverlay.js',
        client + 'src/js/view/mxOutline.js',
        client + 'src/js/view/mxMultiplicity.js',
        client + 'src/js/view/mxLayoutManager.js',
        client + 'src/js/view/mxSwimlaneManager.js',
        client + 'src/js/view/mxTemporaryCellStates.js',
        client + 'src/js/view/mxCellStatePreview.js',
        client + 'src/js/view/mxConnectionConstraint.js',
        client + 'src/js/handler/mxGraphHandler.js',
        client + 'src/js/handler/mxPanningHandler.js',
        client + 'src/js/handler/mxPopupMenuHandler.js',
        client + 'src/js/handler/mxCellMarker.js',
        client + 'src/js/handler/mxSelectionCellsHandler.js',
        client + 'src/js/handler/mxConnectionHandler.js',
        client + 'src/js/handler/mxConstraintHandler.js',
        client + 'src/js/handler/mxRubberband.js',
        client + 'src/js/handler/mxHandle.js',
        client + 'src/js/handler/mxVertexHandler.js',
        client + 'src/js/handler/mxEdgeHandler.js',
        client + 'src/js/handler/mxElbowEdgeHandler.js',
        client + 'src/js/handler/mxEdgeSegmentHandler.js',
        client + 'src/js/handler/mxKeyHandler.js',
        client + 'src/js/handler/mxTooltipHandler.js',
        client + 'src/js/handler/mxCellTracker.js',
        client + 'src/js/handler/mxCellHighlight.js',
        client + 'src/js/editor/mxDefaultKeyHandler.js',
        client + 'src/js/editor/mxDefaultPopupMenu.js',
        client + 'src/js/editor/mxDefaultToolbar.js',
        client + 'src/js/editor/mxEditor.js',
        client + 'src/js/io/mxCodecRegistry.js',
        client + 'src/js/io/mxCodec.js',
        client + 'src/js/io/mxObjectCodec.js',
        client + 'src/js/io/mxCellCodec.js',
        client + 'src/js/io/mxModelCodec.js',
        client + 'src/js/io/mxRootChangeCodec.js',
        client + 'src/js/io/mxChildChangeCodec.js',
        client + 'src/js/io/mxTerminalChangeCodec.js',
        client + 'src/js/io/mxGenericChangeCodec.js',
        client + 'src/js/io/mxGraphCodec.js',
        client + 'src/js/io/mxGraphViewCodec.js',
        client + 'src/js/io/mxStylesheetCodec.js',
        client + 'src/js/io/mxDefaultKeyHandlerCodec.js',
        client + 'src/js/io/mxDefaultToolbarCodec.js',
        client + 'src/js/io/mxDefaultPopupMenuCodec.js',
        client + 'src/js/io/mxEditorCodec.js',
        client + 'js/EditorUi.js',
        client + 'js/Editor.js',
        client + 'js/Sidebar.js',
        client + 'js/Graph.js',
        client + 'js/Shapes.js',
        client + 'js/Actions.js',
        client + 'js/Menus.js',
        client + 'js/Format.js',
        client + 'js/Toolbar.js',
        client + 'js/Dialogs.js',
        // 'views/Dialogs.js',
        client + 'js/FileSaver.js',
        client + 'js/CodeTranslator.js'
    ]
}
gulp.task('del_min', function () {
    return del([min_target+'VGDesigner', min_target+'VGServer'], {
        force: true
    });
});
gulp.task('del_publish', function () {
    return del([publish_target+'VGDesigner', publish_target+'VGServer'], {
        force: true
    });
});
gulp.task('txt', function () {
    return gulp.src(src.txt)
        .pipe(gulp.dest(target + 'VGDesigner'))
});
// 图片优化
gulp.task('imagemin', function () {
    return gulp.src(src.imagemin)
        .pipe(imagemin())
        .pipe(gulp.dest(target + 'VGDesigner'))
});
gulp.task('lib', function () {
    return gulp.src(src.lib)
        .pipe(replace(time, ''))
        .pipe(gulp.dest(target + 'VGServer/lib'))
});
gulp.task('router', function () {
    return gulp.src(src.router)
        .pipe(replace(time, ''))
        .pipe(gulp.dest(target + 'VGServer/router'))
});
gulp.task('app', function () {
    return gulp.src(src.app)
        .pipe(replace(time, ''))
        .pipe(gulp.dest(target + 'VGServer'))
});
gulp.task('uglify', function () {
    return gulp.src(src.uglify)
        .pipe(replace(include, ''))
        .pipe(replace(link, ''))
        .pipe(concat('vg.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(target + 'VGDesigner'))
});
gulp.task('minify', function () {
    return gulp.src(src.minify)
        .pipe(concat('vg.min.css'))
        .pipe(minify())
        .pipe(gulp.dest(target + 'VGDesigner'))
});
gulp.task('htmlmin', function () {
    return gulp.src(src.htmlmin)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: {
                keepSpecialComments: 0
            }
        }))
        .pipe(replace(/<script type=\"text\/javascript\" src=\".+\.js\"><\/script>/g, '<script type="text/javascript" src="vg.min.js"></script>'))
        .pipe(replace(/<link rel=\"stylesheet\" type=\"text\/css\" href=\".+\.css\">/g, '<link rel="stylesheet" type="text/css" href="vg.min.css">'))
        .pipe(gulp.dest(target + 'VGDesigner'));
});

gulp.task('default', ['del_min'], function () {
    init(min_src)
    target = min_target
    src.uglify.push('test/**/*.js')
    src.htmlmin.push('test/**/*.html')
    gulp.start('htmlmin', 'minify', 'uglify', 'app', 'router', 'lib', 'imagemin', 'txt');
});
gulp.task('publish', ['del_publish'], function () {
    init(publish_src)
    target = publish_target
    gulp.start('htmlmin', 'minify', 'uglify', 'app', 'router', 'lib', 'imagemin', 'txt');
});

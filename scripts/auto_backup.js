require('shelljs/global');

try {
    // 当deploy完成后执行备份
    hexo.on('deployAfter', function() {
        run();
    });
} catch (e) {
    console.log("产生错误，详情为：" + e.toString());
}

function run() {
    if (!which('git')) {
        echo('Sorry, this script requires git');
        exit(1);
    } 
    else {
        echo("======================Auto Backup Begin===========================");
        //此处修改为Hexo根目录路径
        cd('D:\\1002\\blog\\lidianjin');
        if (exec('git add --all').code !== 0) {
            echo('Error: Git add failed');
            exit(1);
        }
        if (exec('git commit -am "blog auto_backup script\'s commit"').code !== 0) {
            echo('Error: Git commit failed');
            exit(1);
        }
        if (exec('git push -u origin master').code !== 0) {
            echo('Error: Git push failed');
            exit(1);
        }
        echo("==================Auto Backup Complete============================")
    }
}
import { execSync } from 'child_process';

// 获取当前分支名
const getCurrentBranch = () => {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
};

// 执行 git 命令
const runGitCommand = (command: string) => {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`执行命令失败: ${command}`);
    console.error(error);
    process.exit(1);
  }
};

// 主函数
const main = async () => {
  const currentBranch = getCurrentBranch();
  const targetBranch = 'release';

  console.log(`开始合并 ${currentBranch} 到 ${targetBranch}...`);

  // 切换到目标分支并更新
  console.log(`切换到 ${targetBranch} 分支...`);
  runGitCommand(`git checkout ${targetBranch}`);
  runGitCommand(`git pull origin ${targetBranch}`);

  // 合并代码
  console.log('合并代码...');
  runGitCommand(`git merge ${currentBranch}`);

  // 推送到远程
  console.log('推送到远程仓库...');
  runGitCommand(`git push origin ${targetBranch}`);

  // 切换到当前分支
  console.log('切换到当前分支...');
  runGitCommand(`git checkout ${currentBranch}`);
};

main().catch((error) => {
  console.error('部署过程中发生错误:', error);
  process.exit(1);
});

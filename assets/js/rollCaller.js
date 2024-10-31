let isDrawing = false;

        window.addEventListener('load', function () {
            const savedNames = localStorage.getItem("nameList");
            if (savedNames) {
                document.getElementById("nameList").value = savedNames;
                updateNameCount();
            }
        });

        document.getElementById("saveButton").addEventListener("click", function () {
            if (isDrawing) return;

            const nameList = document.getElementById("nameList").value.trim();
            if (nameList) {
                localStorage.setItem("nameList", nameList);
                updateNameCount();
                alert("名字已保存！");
            } else {
                alert("请输入至少一个名字");
            }
        });

        document.getElementById("drawButton").addEventListener("click", function () {
            if (isDrawing) return;
            isDrawing = true;

            const savedNames = localStorage.getItem("nameList");

            if (savedNames) {
                const names = savedNames.split(",");
                const resultElement = document.getElementById("result");
                let currentIndex = 0;
                let animationInterval;

                document.getElementById("saveButton").disabled = true;
                document.getElementById("drawButton").disabled = true;
                document.getElementById("clearButton").disabled = true;
                document.getElementById("nameList").disabled = true;

                resultElement.classList.add("shaking");

                animationInterval = setInterval(() => {
                    resultElement.textContent = names[currentIndex].trim();
                    currentIndex = (currentIndex + 1) % names.length;
                }, 100);

                setTimeout(() => {
                    clearInterval(animationInterval);
                    resultElement.classList.remove("shaking");
                    const randomIndex = Math.floor(Math.random() * names.length);
                    const randomName = names[randomIndex].trim();

                    resultElement.style.opacity = 0;
                    setTimeout(() => {
                        resultElement.textContent = `点到的人是：${randomName}`;
                        resultElement.style.opacity = 1;
                        resultElement.classList.add("highlight"); // Add highlight animation
                    }, 50);

                    document.getElementById("saveButton").disabled = false;
                    document.getElementById("drawButton").disabled = false;
                    document.getElementById("clearButton").disabled = false;
                    document.getElementById("nameList").disabled = false;

                    isDrawing = false;
                }, 3000);

            } else {
                document.getElementById("result").textContent = "请先保存一些名字";
                isDrawing = false;
            }
        });

        document.getElementById("clearButton").addEventListener("click", function () {
            if (isDrawing) return;

            localStorage.removeItem("nameList");
            document.getElementById("nameList").value = "";
            document.getElementById("result").textContent = "等待点名...";
            updateNameCount();
            alert("数据已清空！");
        });

        function updateNameCount() {
            const nameList = document.getElementById("nameList").value.trim();
            const nameArray = nameList ? nameList.split(",") : [];
            document.getElementById("nameCount").textContent = `总人数：${nameArray.length}`;
        }
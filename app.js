function validateScenario() {
    const input = document.getElementById("scenarioInput").value;
    const result = document.getElementById("scenarioResult");

    try {
        const parsed = JSON.parse(input);

        if (!parsed.actions || !Array.isArray(parsed.actions)) {
            throw new Error("Поле actions должно быть массивом.");
        }

        result.innerHTML = "<span style='color: #2ea043;'>JSON корректен.</span>";
    } catch (e) {
        result.innerHTML = "<span style='color: #f85149;'>Ошибка: " + e.message + "</span>";
    }
}

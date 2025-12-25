function AnalyticsAi({
  selectedMonth,
  userQuestion,
  setUserQuestion,
  getAIInsights,
}) {
  return (
    <section className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl p-3 md:p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-white/20 p-2 rounded-xl">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-base md:text-xl font-semibold text-white">
            AI Financial Advisor
          </h3>
          <p className="text-indigo-100 text-xs">
            Get personalized insights for {selectedMonth}
          </p>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-2 mb-3 backdrop-blur-sm">
        <label className="text-sm text-indigo-100 mb-1 block">
          Ask a question (optional)
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="e.g., How can I save more money?"
            className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            onKeyPress={(e) => e.key === "Enter" && getAIInsights()}
          />
          <button
            onClick={getAIInsights}
            disabled={aiLoading}
            className="bg-white text-indigo-600 px-3 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm whitespace-nowrap"
          >
            {aiLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Get Insights
              </>
            )}
          </button>
        </div>
      </div>

      {aiInsights ? (
        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> AI Insights & Recommendations
          </h4>
          <div className="text-indigo-50 whitespace-pre-wrap leading-relaxed text-sm">
            {aiInsights}
          </div>
        </div>
      ) : (
        !aiLoading && (
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <Sparkles className="w-8 h-8 text-white/50 mx-auto mb-2" />
            <p className="text-indigo-100 text-sm">
              Click "Get Insights" to receive AI-powered analysis of your
              spending for {selectedMonth}
            </p>
          </div>
        )
      )}
    </section>
  );
}

export default AnalyticsAi;

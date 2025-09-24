# 🔧 T.H.A.I.S. Chatbot API Setup Guide

## Quick Setup

1. **Get your Gemini API key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Click "Create API Key"
   - Copy the generated key

2. **Configure the environment**:
   ```bash
   cd frontend
   cp .env.example .env
   ```

3. **Add your API key** to `.env`:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Restart the development server**:
   ```bash
   npm run dev
   ```

## Troubleshooting Common Issues

### ❌ "API request failed after 3 retries"
**Possible causes:**
- Invalid API key
- Network connectivity issues
- API quota exceeded
- CORS issues

**Solutions:**
1. Verify your API key is correct
2. Check if you have internet connectivity
3. Try a different network (some corporate networks block API calls)
4. Check Google Cloud Console for API usage limits

### ❌ "ACESSO NEGADO: Chave de API inválida"
**Solution:**
- Double-check your API key in the `.env` file
- Make sure there are no extra spaces or characters
- Regenerate the API key if needed

### ❌ "MAINFRAME SOBRECARREGADO: Muitas consultas"
**Solution:**
- Wait a few minutes before trying again
- You've hit the rate limit for the Gemini API
- Consider upgrading your API plan if this happens frequently

### ❌ "ERRO DE REDE: Impossível conectar ao mainframe"
**Solutions:**
- Check your internet connection
- Try using a VPN if your network blocks API calls
- Check if your firewall is blocking outbound requests

## Fallback Mode

If the API isn't working, T.H.A.I.S. will automatically switch to **backup mode** with pre-programmed responses about Thais's portfolio. You'll see `[MODO BACKUP ATIVADO]` or `[BACKUP ATIVADO]` in the responses.

The fallback system includes responses for:
- React, TypeScript, JavaScript skills
- Hackathon achievements
- Professional experience
- Contact information
- Project details

## API Costs

The Gemini API has a generous free tier:
- Free tier: 15 requests per minute
- Paid tier: Higher rate limits and more features

Check [Google AI pricing](https://ai.google.dev/pricing) for current rates.

## Security Notes

- ✅ API key is only used client-side for this demo
- ⚠️ For production, implement server-side API calls
- 🔒 Never commit your `.env` file to version control
- 🛡️ Consider implementing rate limiting for production use

## Testing the Chat

Try these example queries:
- "Quais são as habilidades da Thais?"
- "Fale sobre os hackathons"
- "Qual a experiência profissional?"
- "Como posso entrar em contato?"
- "Quais projetos ela desenvolveu?"

## Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Verify your API key is valid in Google AI Studio
3. Test the API directly using curl or Postman
4. Open an issue in the repository

---

**Happy hacking, netrunner! 🚀**
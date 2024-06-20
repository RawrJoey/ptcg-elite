import { State, Player, Prompt, Action, ChoosePrizePrompt, ResolvePromptAction } from '../../game';
import { PromptResolver } from './prompt-resolver';

export class ChoosePrizePromptResolver extends PromptResolver {

  public resolvePrompt(state: State, player: Player, prompt: Prompt<any>): Action | undefined {
    if (prompt instanceof ChoosePrizePrompt) {
      const result = player.prizes.filter(p => p.cards.length > 0)
        .slice(0, prompt.options.count);
      return new ResolvePromptAction(prompt.id, result);
    }
  }

}